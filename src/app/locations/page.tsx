'use client'

import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Building2, Trees, Shield } from 'lucide-react'

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
        image: 'https://images.unsplash.com/photo-1590059132213-f91590dfef.jpeg?auto=format&fit=crop&w=1200',
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
        id: '6th-october',
        name: '6th of October',
        description: 'A legacy of space and privacy. The 6th of October city represents a more established luxury, with larger estates, sprawling gardens, and a focus on tranquility. Home to Palm Hills and Dreamland.',
        characteristics: [
            { icon: Trees, text: 'Sprawling Estates' },
            { icon: Shield, text: 'Quiet Enclaves' },
            { icon: Building2, text: 'Established Prestige' }
        ],
        image: 'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&w=1200',
        propertyCount: 28,
    }
]

export default function LocationsPage() {
    return (
        <main className="min-h-screen bg-stone-50 pt-32 pb-24">
            {/* Intro Header */}
            <section className="px-6 lg:px-12 mb-24 max-w-[1800px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-center">Exclusive Territories</span>
                    <h1 className={`${playfair.className} text-5xl md:text-7xl font-semibold text-stone-900 leading-tight mb-8`}>
                        Egypt's Most <span className="italic font-light">Coveted Districts.</span>
                    </h1>
                    <p className="text-stone-500 font-light text-lg leading-relaxed">
                        From the lush gardens of Zayed to the vibrant pulse of New Cairo, we only operate where excellence is the minimum standard.
                    </p>
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
                                    <span className="text-xs font-bold uppercase tracking-widest">{loc.propertyCount} Properties</span>
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
                                Explore Zayed Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
