'use client'

import { Playfair_Display } from "next/font/google";

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Building2, Trees, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'] })

const locations = [
    {
        id: 'sheikh-zayed',
        name: 'Sheikh Zayed',
        description: 'Developed as a sanctuary of premium living, Sheikh Zayed is home to the most exclusive gated communities in Egypt. With wide boulevards, world-class schools, and elite shopping hubs like Arkan Plaza and Sodic West.',
        characteristics: [
            { icon: Trees, text: 'Vast Green Spaces' },
            { icon: Shield, text: 'Maximum Security' },
            { icon: Building2, text: 'Modern Architecture' }
        ],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200',
        propertyCount: 64,
    },
    {
        id: 'new-cairo',
        name: 'New Cairo',
        description: 'The heartbeat of modern Egypt. New Cairo (Fifth Settlement) offers an unparalleled cosmopolitan lifestyle. Featuring iconic developments, luxury office parks, and a vibrant nightlife focused around the CFC and Mivida districts.',
        characteristics: [
            { icon: Trees, text: 'Cosmopolitan Hub' },
            { icon: Shield, text: 'Gated Perfection' },
            { icon: Building2, text: 'Neo-Classical Styles' }
        ],
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200',
        propertyCount: 42,
    },
    {
        id: 'down-town',
        name: 'Down Town',
        description: 'The vibrant historic and cultural center of the city, combining classic architecture with modern renovations and buzzing streets.',
        characteristics: [
            { icon: Building2, text: 'Classic Charm' },
            { icon: Shield, text: 'Urban Energy' },
            { icon: Trees, text: 'Cultural Hotspots' }
        ],
        image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200',
        propertyCount: 35,
    },
    {
        id: 'north-coast',
        name: 'North Coast',
        description: 'The premier summer destination in Egypt, offering pristine beaches, luxury resorts, and high-end waterfront living.',
        characteristics: [
            { icon: Trees, text: 'Beachfront Access' },
            { icon: Shield, text: 'Exclusive Resorts' },
            { icon: Building2, text: 'Summer Retreats' }
        ],
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
        propertyCount: 50,
    },
    {
        id: 'red-sea',
        name: 'Red Sea',
        description: 'A paradise for sea lovers and divers, featuring world-class marinas, stunning coral reefs, and year-round sunshine.',
        characteristics: [
            { icon: Trees, text: 'Marine Life' },
            { icon: Shield, text: 'Luxury Marinas' },
            { icon: Building2, text: 'Coastal Serenity' }
        ],
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200',
        propertyCount: 45,
    }
]

export default function LocationsPage() {
    const [counts, setCounts] = useState<Record<string, number>>({})

    useEffect(() => {
        async function fetchCounts() {
            const { data, error } = await supabase
                .from('properties')
                .select('location')

            if (data && !error) {
                const newCounts: Record<string, number> = {}
                data.forEach((prop: any) => {
                    if (prop.location) {
                        const normalizedKey = prop.location.replace(/_/g, ' ').toLowerCase().trim()
                        newCounts[normalizedKey] = (newCounts[normalizedKey] || 0) + 1
                    }
                })
                setCounts(newCounts)
            }
        }
        fetchCounts()
    }, [])

    return (
        <main className="min-h-screen bg-stone-50 pt-48 pb-24">
            {/* Intro Header */}
            <section className="px-6 lg:px-12 mb-24 max-w-[1800px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto"
                >
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-center">Exclusive Territories</span>
                    <h1 className={`${playfair.className} text-5xl md:text-7xl font-semibold text-stone-900 leading-tight mb-8 md:whitespace-nowrap`}>
                        Egypt's Most <span className="italic font-light">Coveted Districts.</span>
                    </h1>
                </motion.div>
            </section>

            {/* Locations List */}
            <section className="px-6 lg:px-12 max-w-[1800px] mx-auto space-y-32">
                {locations.map((loc, idx) => (
                    <motion.div
                        key={loc.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}
                    >
                        {/* Image Side */}
                        <div className="flex-1 w-full">
                            <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-stone-200">
                                <Image
                                    src={loc.image}
                                    alt={loc.name}
                                    fill
                                    className="object-cover transition-transform duration-[3s] hover:scale-105"
                                />
                                <div className="absolute top-8 left-8 bg-stone-900/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-widest">{counts[loc.name.toLowerCase().trim()] || 0} Properties</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-4">
                                <span className={`${playfair.className} text-8xl font-black text-stone-100`}>0{idx + 1}</span>
                                <h2 className={`${playfair.className} text-5xl md:text-6xl font-semibold text-stone-900`}>{loc.name}</h2>
                            </div>

                            <p className="text-stone-500 font-light text-xl leading-relaxed">
                                {loc.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                {loc.characteristics.map((char, cidx) => (
                                    <div key={cidx} className="flex flex-col gap-2">
                                        <char.icon className="w-5 h-5 text-stone-900" />
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{char.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={`/portfolio?location=${loc.name}`}
                                className="group inline-flex items-center gap-4 px-10 py-5 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all hover:scale-105"
                            >
                                Explore {loc.name} Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Map Section Mockup */}
            <section className="mt-40 px-6 lg:px-12 max-w-[1800px] mx-auto">
                <div className="bg-stone-200 aspect-[21/9] rounded-sm relative overflow-hidden flex items-center justify-center">
                    <Image
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000"
                        alt="Map Background"
                        fill
                        className="object-cover opacity-30 grayscale"
                    />
                    <div className="relative z-10 text-center">
                        <MapPin className="w-12 h-12 text-stone-900 mx-auto mb-6" />
                        <h3 className={`${playfair.className} text-3xl font-semibold text-stone-900 mb-4`}>Regional Dominance</h3>
                        <p className="text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">Our presence extends across the Greater Cairo region, providing localized expertise for the Class A market.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
