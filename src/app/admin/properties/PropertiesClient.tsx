'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Playfair_Display } from "next/font/google"
import { Building2, Plus, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function AdminPropertiesClient({ initialProperties }: { initialProperties: any[] }) {
    const router = useRouter()
    const [properties, setProperties] = useState(initialProperties)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [error, setError] = useState('')

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This will remove all associated images as well.`)) return

        setDeletingId(id)
        setError('')

        try {
            // 1. Get images to delete from storage
            const prop = properties.find(p => p.id === id)
            if (prop && prop.images) {
                const fileNames = prop.images.map((url: string) => url.split('/').pop())
                if (fileNames.length > 0) {
                    await supabase.storage.from('property-images').remove(fileNames)
                }
            }

            // 2. Delete record
            const { error: deleteError } = await supabase
                .from('properties')
                .delete()
                .eq('id', id)

            if (deleteError) throw deleteError

            setProperties(prev => prev.filter(p => p.id !== id))
            router.refresh()
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to delete property.')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-8">
                <div>
                    <h1 className={`${playfair.className} text-4xl font-semibold`}>Properties</h1>
                    <p className="text-stone-500 text-sm mt-2">Manage your real estate portfolio.</p>
                </div>
                <Link
                    href="/admin/properties/new"
                    className="bg-stone-900 text-white flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Property
                </Link>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 flex items-center gap-3 rounded-sm border-l-4 border-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
                </div>
            )}

            <div className="bg-white border border-stone-200 rounded-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Price/Night</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-stone-100">
                            {properties.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-stone-400 italic">No properties found. Click "Add Property" to create one.</td>
                                </tr>
                            ) : (
                                properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-stone-50 transition-colors group">
                                        <td className="p-4 font-medium text-stone-900 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-stone-100 rounded-sm flex items-center justify-center overflow-hidden">
                                                {property.images && property.images.length > 0 ? (
                                                    <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Building2 className="w-4 h-4 text-stone-400" />
                                                )}
                                            </div>
                                            {property.name}
                                        </td>
                                        <td className="p-4 text-stone-500">{property.location?.replace('_', ' ')}</td>
                                        <td className="p-4 text-stone-900 font-semibold">${property.price_per_night}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-sm ${property.is_active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                                                {property.is_active ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/properties/${property.id}/edit`} className="p-2 text-stone-400 hover:text-stone-900 bg-white border border-stone-200 rounded-sm hover:border-stone-900 transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(property.id, property.name)}
                                                    disabled={deletingId === property.id}
                                                    className="p-2 text-red-400 hover:text-red-600 bg-white border border-stone-200 rounded-sm hover:border-red-600 transition-colors disabled:opacity-50"
                                                >
                                                    {deletingId === property.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
