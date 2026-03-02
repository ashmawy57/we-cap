'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Playfair_Display } from "next/font/google";

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin,
    Maximize2,
    ChevronRight,
    ArrowRight,
    Sparkles,
    Search,
    Bed,
    Bath,
    Maximize,
    Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function PortfolioPage() {
    const [allProperties, setAllProperties] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState('All')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        async function fetchProps() {
            setLoading(true)
            const { data } = await supabase
                .from('properties')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (data) setAllProperties(data)
            setLoading(false)
        }
        fetchProps()
    }, [])

    const filteredProperties = useMemo(() => {
        const normalizedFilter = activeFilter.toUpperCase().replace(' ', '_')
        return activeFilter === 'All'
            ? allProperties
            : allProperties.filter(p => p.location === normalizedFilter)
    }, [activeFilter, allProperties])

    const locationCounts = useMemo(() => {
        const counts: Record<string, number> = { All: allProperties.length }
        allProperties.forEach(p => {
            const locLabel = p.location.replace('_', ' ').toLowerCase().split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
            counts[locLabel] = (counts[locLabel] || 0) + 1
        })
        return counts
    }, [allProperties])

    return (
        <main className="min-h-screen bg-white pb-24 relative overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-20 right-[-10vw] pointer-events-none opacity-[0.02] select-none">
                <h2 className={`${playfair.className} text-[30vw] font-black leading-none`}>
                    ASSETS
                </h2>
            </div>

            {/* --- HERO HEADER --- */}
            <section className="relative pt-40 lg:pt-56 px-6 lg:px-16 max-w-[1800px] mx-auto z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <span className="w-12 h-[1px] bg-stone-900" />
                            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em]">Collection 2026/27</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-100 rounded-full">
                                <Sparkles className="w-3 h-3 text-sky-500" />
                                <span className="text-sky-600 text-[8px] font-black uppercase tracking-widest">{allProperties.length} Assets Found</span>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* --- PREMIUM FILTER BAR --- */}
                <div className="relative sticky top-24 z-50 bg-white/80 backdrop-blur-2xl border-y border-stone-100 py-6 px-4 md:px-8 mb-20 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['All', 'Sheikh Zayed', 'New Cairo', 'Down Town', 'North Coast', 'Red Sea'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setActiveFilter(loc)}
                                className={`group relative px-8 py-3 rounded-sm transition-all whitespace-nowrap overflow-hidden shrink-0 ${activeFilter === loc ? 'text-white' : 'text-stone-400'
                                    }`}
                            >
                                <div className={`absolute inset-0 bg-stone-950 transition-transform duration-500 ${activeFilter === loc ? 'translate-y-0' : 'translate-y-full'
                                    }`} />
                                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                                    {loc}
                                    <span className={`text-[8px] opacity-40 ${activeFilter === loc ? 'text-sky-300' : 'text-stone-300'}`}>
                                        ({locationCounts[loc] || 0})
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ASSET GALLERY GRID --- */}
            <section className="px-6 lg:px-16 max-w-[1800px] mx-auto min-h-[60vh]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <Loader2 className="w-12 h-12 text-stone-900 animate-spin" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Synchronizing Inventory...</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                        >
                            {filteredProperties.map((prop, idx) => (
                                <motion.div
                                    key={prop.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/properties/${prop.id}`}>
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-10 shadow-2xl shadow-stone-200/50">
                                            <Image
                                                src={prop.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                                                alt={prop.name}
                                                fill
                                                className="object-cover transition-transform duration-[3s] group-hover:scale-110 saturate-[0.9] group-hover:saturate-[1.1]"
                                            />

                                            {/* Glass Overlay on Hover */}
                                            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-700 backdrop-blur-0 group-hover:backdrop-blur-[2px]" />

                                            {/* Badge */}
                                            <div className="absolute top-8 left-8">
                                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full">
                                                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                                                    <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">
                                                        {prop.property_type || 'Villa'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* View Control */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
                                                <div className="px-12 py-5 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl flex items-center gap-4">
                                                    Secure Viewing <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>

                                            {/* Quick Metadata */}
                                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                                                        <Bed className="w-3 h-3" /> {prop.bedrooms}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                                                        <Bath className="w-3 h-3" /> {prop.bathrooms}
                                                    </div>
                                                </div>
                                                <div className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10">
                                                    {prop.area_sqm} SQM
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-stone-400 text-[9px] font-bold uppercase tracking-[0.3em]">
                                                    <MapPin className="w-3 h-3 text-stone-900" />
                                                    <span>{prop.location.replace('_', ' ')}</span>
                                                </div>
                                                <h3 className={`${playfair.className} text-3xl font-semibold text-stone-900 tracking-tight group-hover:text-sky-600 transition-colors`}>
                                                    {prop.name}
                                                </h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-stone-900 font-black text-2xl leading-none tracking-tighter">${prop.price_per_night.toLocaleString()}</span>
                                                <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mt-2">NIGHTLY TIER</p>
                                            </div>
                                        </div>

                                        {/* Subtle Footer */}
                                        <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-stone-300">Class A Asset #WC-{prop.id.substring(0, 4)}</span>
                                            <Link href={`/properties/${prop.id}`} className="text-stone-900 p-2 hover:bg-stone-50 rounded-full transition-all">
                                                <Maximize2 className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {!loading && filteredProperties.length === 0 && (
                    <div className="py-40 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-8">
                            <Search className="w-10 h-10 text-stone-200" />
                        </div>
                        <p className={`${playfair.className} text-3xl text-stone-900 mb-4`}>No assets found in {activeFilter}.</p>
                        <p className="text-stone-400 font-light max-w-xs mx-auto">Our acquisition team is currently vetting new properties in this sector.</p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="mt-12 text-[10px] font-bold uppercase tracking-widest text-sky-600 border-b border-sky-200 pb-2"
                        >
                            Reset to Full Collection
                        </button>
                    </div>
                )}
            </section>


        </main>
    )
}
