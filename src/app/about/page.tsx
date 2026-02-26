'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Playfair_Display } from 'next/font/google'
import {
    History,
    Target,
    Heart,
    ShieldCheck,
    Users,
    Waves,
    ArrowRight,
    Globe
} from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function AboutPage() {
    return (
        <div className="bg-white selection:bg-stone-900 selection:text-white overflow-x-hidden">

            {/* --- EDITORIAL HERO --- */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=95"
                        alt="About West Capital"
                        fill
                        className="object-cover brightness-[0.5] contrast-[1.1]"
                        priority
                    />
                </motion.div>

                <div className="relative z-10 text-center px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-8"
                    >
                        <span className="inline-block text-white/60 text-[10px] font-bold uppercase tracking-[0.6em] border border-white/20 px-8 py-3 rounded-full backdrop-blur-xl">
                            Our Heritage & Vision
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className={`${playfair.className} text-6xl md:text-[8vw] text-white font-black leading-[0.85] tracking-tighter`}
                    >
                        THE STORY <br /> <span className="italic font-light opacity-90 tracking-[-0.05em]">BEHIND THE NAME.</span>
                    </motion.h1>
                </div>
            </section>

            {/* --- THE NARRATIVE SECTION --- */}
            <section className="py-40 px-6 lg:px-24 bg-white relative">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

                    <div className="lg:col-span-6 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200"
                                alt="Architecture and Culture"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-stone-900/10" />
                        </motion.div>

                        {/* Established Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-12 -right-12 bg-stone-950 text-white p-12 aspect-square flex flex-col items-center justify-center rounded-sm z-20 shadow-2xl hidden md:flex"
                        >
                            <span className="text-4xl font-black mb-1">2015</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-stone-500">Established</span>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8 space-y-12">
                        <div className="space-y-6">
                            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em]">Who We Are</span>
                            <h2 className={`${playfair.className} text-5xl md:text-7xl text-stone-900 font-medium leading-none tracking-tighter`}>
                                Redefining <br /> <span className="italic font-light">Hospitality Standards.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 text-stone-500 text-lg font-light leading-relaxed">
                            <p>
                                We are a company established in 2015, specializing in property management and providing integrated accommodation solutions. Over the past decade, we have evolved from a boutique agency into a premier residential management firm for the Class A elite.
                            </p>
                            <p>
                                Through our digital platform, we offer our clients fully furnished hotel units that meet the needs of both short-term and long-term stays, ensuring a comfortable and exceptional living experience that feels like a sanctuary, not just a service.
                            </p>
                            <p>
                                Our mission is simple: to connect discerning travelers and long-term residents with the architectural legacy of modern Egypt, while providing the seamless infrastructure of a high-end concierge.
                            </p>
                        </div>

                        <div className="pt-12 border-t border-stone-100 flex items-center gap-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold text-stone-900">10+</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Years of Luxury</span>
                            </div>
                            <div className="h-12 w-[1px] bg-stone-100" />
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold text-stone-900">1.2K+</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Class A Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR MISSION & SERVICES: GRID --- */}
            <section className="py-40 bg-stone-50 overflow-hidden">
                <div className="px-6 lg:px-24 max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
                        <div className="max-w-3xl">
                            <h2 className={`${playfair.className} text-6xl font-medium text-stone-900 leading-[0.95] tracking-tighter`}>
                                The Pillars of Our <br /> <span className="italic font-light">Service Management.</span>
                            </h2>
                        </div>
                        <div className="lg:max-w-xs">
                            <p className="text-stone-400 text-sm font-light leading-relaxed">
                                We provide a range of integrated services to help our clients enjoy a smooth and stress-free journey to Egypt.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-stone-200 border border-stone-200">
                        {[
                            {
                                title: 'Property Management',
                                icon: ShieldCheck,
                                desc: 'Strategic oversight of Class A assets, focusing on maintenance, legal clearance, and value preservation.'
                            },
                            {
                                title: 'Bespoke Mobility',
                                icon: Globe,
                                desc: 'Premium transportation solutions designed for a smooth transition from arrival to residence.'
                            },
                            {
                                title: 'Elite Hospitality',
                                icon: History,
                                desc: 'Professional cleaning and housekeeping services that maintain the highest hotel standards daily.'
                            },
                            {
                                title: 'Global Connectivity',
                                icon: Waves,
                                desc: 'Helping international and local clients navigate the premium real estate landscape of Egypt seamlessly.'
                            },
                            {
                                title: 'Client Discretion',
                                icon: Target,
                                desc: 'Confidentiality is our foundation. We manage the requests and data of high-value clients with absolute privacy.'
                            },
                            {
                                title: 'Integrated Living',
                                icon: Heart,
                                desc: 'From short stays to long-term residencies, our units are fully furnished for the refined modern lifestyle.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-16 space-y-8 hover:bg-stone-950 hover:text-white transition-all duration-700 group cursor-default">
                                <item.icon className="w-12 h-12 text-stone-300 group-hover:text-sky-400 transition-colors" strokeWidth={1} />
                                <div className="space-y-4">
                                    <h3 className={`${playfair.className} text-3xl font-semibold`}>{item.title}</h3>
                                    <p className="text-stone-500 text-sm font-light leading-relaxed group-hover:text-stone-400">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FULLSCREEN IMAGE CTA --- */}
            <section className="relative h-[70vh] flex items-center justify-center text-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400"
                        alt="The West Capital Standard"
                        fill
                        className="object-cover brightness-50"
                    />
                </div>
                <div className="relative z-10 px-6 max-w-4xl space-y-12">
                    <h2 className={`${playfair.className} text-5xl md:text-8xl text-white font-medium leading-none tracking-tighter`}>
                        Experience The <br /> <span className="italic font-light">Standard Of Living.</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <Link
                            href="/portfolio"
                            className="px-16 py-6 bg-white text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:px-20 transition-all rounded-sm"
                        >
                            Explore Collection
                        </Link>
                        <Link
                            href="/contact"
                            className="px-16 py-6 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all rounded-sm"
                        >
                            Contact Concierge
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- REPUTATION BAR --- */}
            <section className="py-24 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20 items-center opacity-30">
                    <span className={`${playfair.className} text-2xl font-black text-center`}>VOGUE</span>
                    <span className={`${playfair.className} text-2xl font-black text-center`}>ARCH-DIGEST</span>
                    <span className={`${playfair.className} text-2xl font-black text-center`}>FORBES</span>
                    <span className={`${playfair.className} text-2xl font-black text-center`}>MANSION-GLOBAL</span>
                </div>
            </section>

        </div>
    )
}
