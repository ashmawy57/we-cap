'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Playfair_Display } from "next/font/google"
import { ArrowLeft, Loader2, UploadCloud, X, AlertCircle, CheckCircle2, ImageOff } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'] })

const LOCATIONS = [
    { value: 'SHEIKH_ZAYED', label: 'Sheikh Zayed' },
    { value: 'NEW_CAIRO', label: 'New Cairo' },
    { value: 'DOWN_TOWN', label: 'Down Town' },
    { value: 'NORTH_COAST', label: 'North Coast' },
    { value: 'RED_SEA', label: 'Red Sea' },
]

const PROPERTY_TYPES = [
    'Villa', 'Standalone', 'Townhouse', 'Penthouse', 'Apartment', 'Duplex'
]

export default function EditProperty() {
    const router = useRouter()
    const params = useParams()
    const propertyId = params.id as string

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Existing images from DB (URLs)
    const [existingImages, setExistingImages] = useState<string[]>([])
    // New images to upload (Files)
    const [newImages, setNewImages] = useState<File[]>([])
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
    const [uploadProgress, setUploadProgress] = useState(0)

    // Form fields
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: 'SHEIKH_ZAYED',
        address: '',
        price_per_night: 0,
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 0,
        area_sqm: 0,
        property_type: 'Villa',
        amenities: '',
        is_active: true
    })

    // Fetch property data on mount
    useEffect(() => {
        async function fetchProperty() {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', propertyId)
                .single()

            if (error || !data) {
                setError('Property not found.')
                setFetching(false)
                return
            }

            setFormData({
                name: data.name || '',
                description: data.description || '',
                location: data.location || 'SHEIKH_ZAYED',
                address: data.address || '',
                price_per_night: data.price_per_night || 0,
                bedrooms: data.bedrooms || 1,
                bathrooms: data.bathrooms || 1,
                max_guests: data.max_guests || 0,
                area_sqm: data.area_sqm || 0,
                property_type: data.property_type || 'Villa',
                amenities: data.amenities ? data.amenities.join(', ') : '',
                is_active: data.is_active ?? true
            })
            setExistingImages(data.images || [])
            setFetching(false)
        }
        fetchProperty()
    }, [propertyId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setNewImages(prev => [...prev, ...files])
            const previews = files.map(file => URL.createObjectURL(file))
            setNewImagePreviews(prev => [...prev, ...previews])
        }
    }

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index))
    }

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index))
        setNewImagePreviews(prev => {
            const updated = [...prev]
            URL.revokeObjectURL(updated[index])
            updated.splice(index, 1)
            return updated
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        setUploadProgress(0)

        try {
            // 1. Upload new images in parallel chunks
            const uploadedNewUrls: string[] = []

            if (newImages.length > 0) {
                const chunkSize = 5
                for (let i = 0; i < newImages.length; i += chunkSize) {
                    const chunk = newImages.slice(i, i + chunkSize)
                    const uploadPromises = chunk.map(async (file) => {
                        const fileExt = file.name.split('.').pop()
                        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

                        const { error: uploadError } = await supabase.storage
                            .from('property-images')
                            .upload(fileName, file)

                        if (uploadError) throw uploadError

                        const { data: { publicUrl } } = supabase.storage
                            .from('property-images')
                            .getPublicUrl(fileName)

                        return publicUrl
                    })

                    const chunkUrls = await Promise.all(uploadPromises)
                    uploadedNewUrls.push(...chunkUrls)
                    setUploadProgress(Math.round(((i + chunk.length) / newImages.length) * 100))
                }
            }

            // 2. Combine existing + new image URLs
            const allImages = [...existingImages, ...uploadedNewUrls]

            if (allImages.length === 0) throw new Error('Please keep at least one image.')

            // 3. Parse amenities
            const amenitiesArray = formData.amenities
                ? formData.amenities.split(',').map(a => a.trim()).filter(a => a)
                : []

            // 4. Update property in DB
            const updateData = {
                name: formData.name,
                description: formData.description,
                location: formData.location,
                address: formData.address,
                price_per_night: Number(formData.price_per_night),
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                max_guests: Number(formData.max_guests),
                area_sqm: Number(formData.area_sqm),
                property_type: formData.property_type,
                amenities: amenitiesArray,
                images: allImages,
                is_active: formData.is_active
            }

            const { error: updateError } = await supabase
                .from('properties')
                .update(updateData)
                .eq('id', propertyId)

            if (updateError) throw updateError

            setSuccess('Property updated successfully!')
            setNewImages([])
            setNewImagePreviews([])

            // Refresh after short delay
            setTimeout(() => {
                router.push('/admin/properties')
                router.refresh()
            }, 1500)

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'An error occurred while saving.')
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="max-w-6xl mx-auto py-40 flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-12 h-12 text-stone-900 animate-spin" />
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Loading Asset Data...</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-stone-200 pb-12">
                <div className="space-y-4">
                    <Link href="/admin/properties" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Asset Inventory
                    </Link>
                    <h1 className={`${playfair.className} text-6xl font-black text-stone-900 tracking-tighter leading-none`}>
                        Edit <span className="italic font-light">Asset.</span>
                    </h1>
                    <p className="text-stone-400 text-xs font-mono">ID: {propertyId}</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-sm mb-12 flex items-center gap-4 border-l-4 border-red-600 shadow-sm">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-bold uppercase tracking-wider">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-700 p-6 rounded-sm mb-12 flex items-center gap-4 border-l-4 border-green-600 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-bold uppercase tracking-wider">{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <div className="lg:col-span-12 space-y-12 bg-white p-12 border border-stone-100 shadow-xl shadow-stone-200/50 rounded-sm">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Group: Core Identity */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Core Identity</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Asset Title *</label>
                                    <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-lg text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Asset Type</label>
                                        <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white">
                                            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Location Portfolio</label>
                                        <select required name="location" value={formData.location} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white">
                                            {LOCATIONS.map(loc => <option key={loc.value} value={loc.value}>{loc.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Physical Address *</label>
                                    <input required name="address" type="text" value={formData.address} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Narrative / Description *</label>
                                    <textarea required name="description" rows={6} value={formData.description} onChange={handleChange} className="w-full border border-stone-100 p-4 text-stone-600 font-light resize-none focus:border-stone-300 outline-none transition-all leading-relaxed" />
                                </div>
                            </div>
                        </div>

                        {/* Group: Technical Specs */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Technical Specifications</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Area (Sq. Meters) *</label>
                                    <input required name="area_sqm" type="number" value={formData.area_sqm} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-lg font-mono text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Rate / Night ($)</label>
                                    <input required name="price_per_night" type="number" step="0.01" value={formData.price_per_night} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-lg font-mono text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Bedrooms</label>
                                    <input required name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Bathrooms</label>
                                    <input required name="bathrooms" type="number" step={0.5} value={formData.bathrooms} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Amenities (Comma separated)</label>
                                    <input name="amenities" type="text" value={formData.amenities} onChange={handleChange} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" placeholder="Private Pool, WiFi, Secure Parking" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Existing Images */}
                    <div className="space-y-8 pt-12">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Current Visual Manifest ({existingImages.length} Photos)</h3>
                        </div>

                        {existingImages.length > 0 ? (
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 bg-stone-50 p-4 rounded-sm border border-stone-100" style={{ contain: 'content' }}>
                                {existingImages.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-xs overflow-hidden group" style={{ contain: 'layout paint' }}>
                                        <img src={src} alt={`Image ${index + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ contentVisibility: 'auto' }} />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(index)}
                                            className="absolute inset-0 flex items-center justify-center bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="absolute top-0.5 left-0.5 bg-black/50 text-[7px] font-bold text-white px-1 py-0.5 rounded-full pointer-events-none">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-stone-300 gap-4 bg-stone-50 rounded-sm border border-stone-100">
                                <ImageOff className="w-12 h-12" />
                                <p className="text-[10px] font-bold uppercase tracking-widest">All images removed. Add new photos below.</p>
                            </div>
                        )}
                    </div>

                    {/* Upload New Images */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Add More Photos</h3>

                        <div className="relative group">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleNewImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="border-2 border-dashed border-stone-200 rounded-sm py-20 flex flex-col items-center justify-center gap-6 bg-stone-50 group-hover:bg-stone-900/5 transition-all duration-700">
                                <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    <UploadCloud className="w-7 h-7" />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black text-stone-900 tracking-tighter">Add New Images</p>
                                    <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                                        {newImages.length > 0 ? `${newImages.length} new images staged` : 'Drag and drop or click to browse'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {newImagePreviews.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 bg-sky-50 p-4 rounded-sm border border-sky-100" style={{ contain: 'content' }}>
                                {newImagePreviews.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-xs overflow-hidden group" style={{ contain: 'layout paint' }}>
                                        <img src={src} alt="New Preview" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute inset-0 flex items-center justify-center bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                        <div className="absolute top-0.5 left-0.5 bg-sky-500/60 text-[7px] font-bold text-white px-1 py-0.5 rounded-full pointer-events-none">
                                            NEW
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="pt-20 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-6 h-6 accent-stone-900 cursor-pointer" />
                            <label htmlFor="is_active" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 cursor-pointer">Published</label>
                        </div>

                        <div className="flex gap-8 items-center w-full sm:w-auto">
                            {loading && newImages.length > 0 && (
                                <div className="flex items-center gap-4 text-stone-400 font-mono text-[10px] uppercase tracking-widest">
                                    <span>Uploading New: {uploadProgress}%</span>
                                    <div className="w-32 h-1 bg-stone-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-stone-900 transition-all duration-500" style={{ width: `${uploadProgress}%` }} />
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 sm:flex-initial bg-stone-900 text-white flex items-center justify-center min-w-[280px] px-12 py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-all disabled:opacity-50 shadow-2xl hover:-translate-y-1 active:translate-y-0"
                            >
                                {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-3" /> Saving...</> : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
