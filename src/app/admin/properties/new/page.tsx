'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Playfair_Display } from "next/font/google"
import { ArrowLeft, Loader2, UploadCloud, X, CheckCircle2, AlertCircle } from 'lucide-react'
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

const AMENITIES_LIST = [
    'Private Pool', 'WiFi', 'Secure Parking',
    'Gym', 'Garden', '24/7 Security', "Nanny's room"
]

export default function NewProperty() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setImages(prev => [...prev, ...newFiles])

            const newPreviews = newFiles.map(file => URL.createObjectURL(file))
            setImagePreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => {
            const newPreviews = [...prev]
            URL.revokeObjectURL(newPreviews[index])
            newPreviews.splice(index, 1)
            return newPreviews
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setUploadProgress(0)

        const formData = new FormData(e.currentTarget)

        try {
            if (images.length === 0) throw new Error('Please upload at least one image.')

            // 1. Parallel Upload Images
            const imageUrls: string[] = []
            const totalImages = images.length

            // We'll upload in chunks to avoid slamming the connection
            const chunkSize = 5
            for (let i = 0; i < images.length; i += chunkSize) {
                const chunk = images.slice(i, i + chunkSize)
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
                imageUrls.push(...chunkUrls)

                // Update progress
                setUploadProgress(Math.round(((i + chunk.length) / totalImages) * 100))
            }

            // 2. Parse data
            const amenitiesArray = formData.getAll('amenities') as string[]

            // 3. Insert property record
            const propertyData = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                address: formData.get('address') as string,
                price_per_night: Number(formData.get('price_per_night')),
                bedrooms: Number(formData.get('bedrooms')),
                bathrooms: Number(formData.get('bathrooms')),
                living_rooms: Number(formData.get('living_rooms')),
                max_guests: Number(formData.get('max_guests')),
                area_sqm: Number(formData.get('area_sqm')),
                property_type: formData.get('property_type') as string,
                amenities: amenitiesArray,
                images: imageUrls,
                is_active: formData.get('is_active') === 'on'
            }

            const { error: insertError } = await supabase
                .from('properties')
                .insert(propertyData)

            if (insertError) throw insertError

            router.push('/admin/properties')
            router.refresh()

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'An error occurred while saving.')
            setLoading(false)
        }
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
                        New <span className="italic font-light">Asset.</span>
                    </h1>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-sm mb-12 flex items-center gap-4 border-l-4 border-red-600 shadow-sm animate-pulse">
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-bold uppercase tracking-wider">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Form Details */}
                <div className="lg:col-span-12 space-y-12 bg-white p-12 border border-stone-100 shadow-xl shadow-stone-200/50 rounded-sm">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Group: Core Identity */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Core Identity</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Asset Title *</label>
                                    <input required name="name" type="text" className="w-full border-b border-stone-200 py-3 text-lg text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" placeholder="e.g. Villa Beverly 110" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Asset Type</label>
                                        <select name="property_type" className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white">
                                            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Location Portfolio</label>
                                        <select required name="location" className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white">
                                            {LOCATIONS.map(loc => <option key={loc.value} value={loc.value}>{loc.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Physical Address *</label>
                                    <input required name="address" type="text" className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" placeholder="e.g. Street 10, Beverly Hills" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Guests</label>
                                    <input required name="max_guests" type="number" defaultValue={1} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Narrative / Description *</label>
                                    <textarea required name="description" rows={6} className="w-full border border-stone-100 p-4 text-stone-600 font-light resize-none focus:border-stone-300 outline-none transition-all leading-relaxed" placeholder="Describe the atmosphere..." />
                                </div>
                            </div>
                        </div>

                        {/* Group: Technical Specs */}
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Technical Specifications</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Area (Sq. Meters) *</label>
                                    <input required name="area_sqm" type="number" className="w-full border-b border-stone-200 py-3 text-lg font-mono text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" placeholder="0" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Rate / Night ($)</label>
                                    <input required name="price_per_night" type="number" step="0.01" className="w-full border-b border-stone-200 py-3 text-lg font-mono text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white" placeholder="0.00" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:col-span-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Bedrooms</label>
                                        <input required name="bedrooms" type="number" defaultValue={1} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Bathrooms</label>
                                        <input required name="bathrooms" type="number" defaultValue={1} step={0.5} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Living Rooms</label>
                                        <input required name="living_rooms" type="number" defaultValue={1} className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-white font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Amenities</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border-b border-stone-200 pb-6 pt-2">
                                        {AMENITIES_LIST.map(amenity => (
                                            <div key={amenity} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    id={`amenity-${amenity}`}
                                                    name="amenities"
                                                    value={amenity}
                                                    className="w-4 h-4 accent-stone-900 cursor-pointer"
                                                />
                                                <label htmlFor={`amenity-${amenity}`} className="text-xs text-stone-700 cursor-pointer">
                                                    {amenity}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Assets (The big part) */}
                    <div className="space-y-8 pt-12">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-400 border-b border-stone-50 pb-4">Visual Manifest (50+ Photos)</h3>

                        <div className="relative group">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="border-2 border-dashed border-stone-200 rounded-sm py-32 flex flex-col items-center justify-center gap-6 bg-stone-50 group-hover:bg-stone-900/5 transition-all duration-700">
                                <div className="w-20 h-20 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-black text-stone-900 tracking-tighter">Bulk Media Ingestion Area</p>
                                    <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-2">{images.length > 0 ? `${images.length} images staged for ingestion` : 'Drag and drop 50+ photos (Up to 50MB/each)'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Compact Image Gallery Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mt-12 bg-stone-50 p-4 rounded-sm border border-stone-100" style={{ contain: 'content' }}>
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-xs overflow-hidden group" style={{ contain: 'layout paint' }}>
                                        <img src={src} alt="Preview" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
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
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="pt-20 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" id="is_active" name="is_active" defaultChecked className="w-6 h-6 accent-stone-900 cursor-pointer" />
                            <label htmlFor="is_active" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 cursor-pointer">Immediate Publication</label>
                        </div>

                        <div className="flex gap-8 items-center w-full sm:w-auto">
                            {loading && (
                                <div className="flex items-center gap-4 text-stone-400 font-mono text-[10px] uppercase tracking-widest">
                                    <span>Ingesting Imagery: {uploadProgress}%</span>
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
                                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : 'Register Asset'}
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
