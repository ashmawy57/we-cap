'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Playfair_Display } from "next/font/google";

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
            <section className="relative min-h-[70vh] flex flex-col items-center justify-start pt-48 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=95"
                        alt="About WECAP"
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
                                src="/who we are (2).png"
                                alt="Who We Are"
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
                                Founded in 2015, we are a hospitality-driven company built on one simple belief: every guest deserves to feel at home. From day one, our focus has been on delivering exceptional hospitality services that combine professionalism, comfort, and attention to detail. We are passionate about creating seamless experiences where quality meets warmth.
                            </p>

                            <div className="pt-4 border-t border-stone-100">
                                <h3 className={`${playfair.className} text-3xl font-medium text-stone-900 mb-4`}>Our Vision</h3>
                                <p>To become the leading hospitality platform, setting new standards in service excellence, innovation, and guest satisfaction.</p>
                            </div>

                            <div className="pt-4 border-t border-stone-100">
                                <h3 className={`${playfair.className} text-3xl font-medium text-stone-900 mb-4`}>Our Mission</h3>
                                <p>Our mission is to ensure that every guest feels welcomed, valued, and completely at ease — just like being at home. We are committed to delivering personalized service, maintaining high operational standards, and continuously improving the experience we offer.</p>
                            </div>
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
                        alt="The WECAP Standard"
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
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- PREMIERE PARTNERS: THE TRUST MARQUEE --- */}
            <section className="py-12 bg-stone-50/30 border-y border-stone-100 overflow-hidden relative">
                {/* Cinematic Side Fades */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-stone-50/30 via-stone-50/10 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-stone-50/30 via-stone-50/10 to-transparent z-10 pointer-events-none" />

                <div className="flex whitespace-nowrap relative">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24 shrink-0"
                    >
                        {[
                            { name: "Sodic", src: "/sodic (1).png", h: "h-16 md:h-20" },
                            { name: "Palm Hills", src: "/palm hills.png", h: "h-14 md:h-16" },
                            { name: "Emaar", src: "/emaar.png", h: "h-16 md:h-20" },
                            { name: "Dorra", src: "/dorra.png", h: "h-16 md:h-20" },
                            { name: "Gates", src: "/gates.png", h: "h-16 md:h-20" },
                            { name: "Marakez", src: "/marakez.png", h: "h-14 md:h-18" },
                        ].map((logo, i) => (
                            <motion.div
                                key={`logo-1-${i}`}
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                className={`relative ${logo.h} w-48 md:w-72 shrink-0 brightness-0 opacity-40 transition-all duration-500 cursor-pointer`}
                            >
                                <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                            </motion.div>
                        ))}
                        {/* Duplicated set for seamless loop */}
                        {[
                            { name: "Sodic", src: "/sodic (1).png", h: "h-16 md:h-20" },
                            { name: "Palm Hills", src: "/palm hills.png", h: "h-14 md:h-16" },
                            { name: "Emaar", src: "/emaar.png", h: "h-16 md:h-20" },
                            { name: "Dorra", src: "/dorra.png", h: "h-12 md:h-20" },
                            { name: "Gates", src: "/gates.png", h: "h-16 md:h-20" },
                            { name: "Marakez", src: "/marakez.png", h: "h-14 md:h-18" },
                        ].map((logo, i) => (
                            <motion.div
                                key={`logo-2-${i}`}
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                className={`relative ${logo.h} w-48 md:w-72 shrink-0 brightness-0 opacity-40 transition-all duration-500 cursor-pointer`}
                            >
                                <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </div>
    )
}
