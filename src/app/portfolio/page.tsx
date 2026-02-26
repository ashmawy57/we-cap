'use client'

import React, { useState, useMemo } from 'react'
import { Playfair_Display } from 'next/font/google'
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
    Maximize
} from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

const allProperties = [
    {
        id: 'prop_villa_beverly_110',
        name: 'Villa Beverly 110',
        location: 'Sheikh Zayed',
        subLocation: 'Beverly Hills Compound',
        price: 270,
        image: '/فيلا بيفرلي 110 (1).jpeg',
        type: 'Villa',
        sqft: '8,000',
        beds: 8,
        baths: 6
    },
    {
        id: 'prop_qasr_el_sawah',
        name: 'Qasr El Sawah ',
        location: 'Sheikh Zayed',
        subLocation: 'Al Tharwa Al Khadraa',
        price: 500,
        image: '/قصر السواح (1).jpg',
        type: 'Palace',
        sqft: '10,000',
        beds: 9,
        baths: 6
    },
    {
        id: 'prop_algaria',
        name: 'Al Garia townhouse',
        location: 'Sheikh Zayed',
        subLocation: 'Al Garia',
        price: 450,
        image: '/تاون هاوس الجريا (1).jpeg',
        type: 'Townhouse',
        sqft: '4,200',
        beds: 4,
        baths: 3
    }
]

export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const filteredProperties = useMemo(() => {
        return activeFilter === 'All'
            ? allProperties
            : allProperties.filter(p => p.location === activeFilter)
    }, [activeFilter])

    const locationCounts = useMemo(() => {
        const counts: Record<string, number> = { All: allProperties.length }
        allProperties.forEach(p => {
            counts[p.location] = (counts[p.location] || 0) + 1
        })
        return counts
    }, [])

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

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className={`${playfair.className} text-6xl md:text-[9vw] font-black text-stone-900 leading-[0.8] tracking-tighter`}
                        >
                            Curated <br /> <span className="italic font-light opacity-80">Sanctuaries.</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-end gap-4"
                    >
                        <p className="text-stone-400 text-sm max-w-xs text-right font-light leading-relaxed">
                            Managing the most exclusive gated communities across Greater Cairo. Discrete. Verified. Elite.
                        </p>
                    </motion.div>
                </div>

                {/* --- PREMIUM FILTER BAR --- */}
                <div className="relative sticky top-24 z-50 bg-white/80 backdrop-blur-2xl border-y border-stone-100 py-6 px-4 md:px-8 mb-20 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {['All', 'Sheikh Zayed', 'New Cairo', '6th of October'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => setActiveFilter(loc)}
                                className={`group relative px-8 py-3 rounded-sm transition-all whitespace-nowrap overflow-hidden ${activeFilter === loc ? 'text-white' : 'text-stone-400'
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

                    <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="flex items-center gap-3 text-stone-900 font-bold uppercase tracking-widest text-[9px] hover:text-sky-600 transition-colors"
                        >
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Search Assets</span>
                        </button>
                        <div className="h-6 w-[1px] bg-stone-100 hidden sm:block" />
                        <p className="text-[9px] text-stone-300 font-bold uppercase tracking-[0.2em]">
                            Sort by: <span className="text-stone-900">Highest Tier</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- ASSET GALLERY GRID --- */}
            <section className="px-6 lg:px-16 max-w-[1800px] mx-auto min-h-[60vh]">
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
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-10 shadow-2xl shadow-stone-200/50">
                                        <Image
                                            src={prop.image}
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
                                                    {prop.type}
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
                                                    <Bed className="w-3 h-3" /> {prop.beds}
                                                </div>
                                                <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                                                    <Bath className="w-3 h-3" /> {prop.baths}
                                                </div>
                                            </div>
                                            <div className="text-white text-[10px] font-bold uppercase tracking-widest bg-white/10 px-4 py-2 backdrop-blur-md border border-white/10">
                                                {prop.sqft} SQFT
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-stone-400 text-[9px] font-bold uppercase tracking-[0.3em]">
                                                <MapPin className="w-3 h-3 text-stone-900" />
                                                <span>{prop.subLocation} &middot; {prop.location}</span>
                                            </div>
                                            <h3 className={`${playfair.className} text-3xl font-semibold text-stone-900 tracking-tight group-hover:text-sky-600 transition-colors`}>
                                                {prop.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-stone-900 font-black text-2xl leading-none tracking-tighter">${prop.price.toLocaleString()}</span>
                                            <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mt-2">NIGHTLY TIER</p>
                                        </div>
                                    </div>

                                    {/* Subtle Footer */}
                                    <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-stone-300">Class A Asset #WC-{prop.id.split('_')[1]}</span>
                                        <Link href={`/properties/${prop.id}`} className="text-stone-900 p-2 hover:bg-stone-50 rounded-full transition-all">
                                            <Maximize2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProperties.length === 0 && (
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

            {/* --- EXCLUSIVE CTA --- */}
            <section className="mt-60 max-w-[1800px] mx-auto px-6 lg:px-16 mb-40">
                <div className="relative h-[600px] rounded-sm overflow-hidden flex items-center justify-center text-center p-12">
                    <Image
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=95"
                        alt="Asset Procurement"
                        fill
                        className="object-cover brightness-[0.4]"
                    />
                    <div className="relative z-10 space-y-12 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.6em]">Priority List</span>
                            <h2 className={`${playfair.className} text-5xl md:text-7xl text-white font-medium leading-[0.9] tracking-tighter`}>
                                Access the <span className="italic">off-market</span> collection.
                            </h2>
                            <p className="text-stone-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Join our private directory to receive earliest notifications on Class A assets before they reach the public inventory.
                            </p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row gap-6 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Official Designation / Email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-8 h-20 text-white outline-none focus:bg-white/10 transition-all font-light"
                            />
                            <button className="h-20 px-12 bg-white text-stone-900 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-stone-200 transition-all active:scale-[0.98]">
                                Join Registry
                            </button>
                        </div>
                        <p className="text-[9px] text-stone-500 font-bold uppercase tracking-[0.4em]">100% Privacy & Non-Disclosure Compliant</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
