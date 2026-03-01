'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from "next/font/google";

import { Menu, X, Search, Globe, Instagram, Linkedin, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    // Hide Navbar on admin routes
    if (pathname?.startsWith('/admin')) return null

    // Lock body scroll
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'unset'
    }, [isOpen])

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuItems = [
        { name: 'The Collection', href: '/portfolio', subtitle: "Explore Egypt's finest assets" },
        { name: 'Exclusive Locations', href: '/locations', subtitle: 'Zayed, New Cairo & Beyond' },
        { name: 'Private Concierge', href: '/contact', subtitle: 'Your 24/7 Lifestyle Manager' },
        { name: 'About WECAP', href: '/about', subtitle: 'Our Heritage & Standards' },
    ]

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 lg:px-16 ${isScrolled
                    ? 'py-4 bg-white/70 backdrop-blur-2xl border-b border-stone-200/50'
                    : 'py-8 bg-transparent'
                    }`}
            >
                <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative z-[110] transition-all duration-500"
                    >
                        <div className={`relative transition-all duration-700 ease-in-out ${isScrolled
                            ? 'h-12 w-36 md:h-20 md:w-64'
                            : 'h-16 w-48 md:h-32 md:w-96'
                            } ${!isScrolled && pathname === '/' ? 'brightness-0 invert' : ''}`}>
                            <Image
                                src="/logoheader.png"
                                alt="WECAP Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav Tools */}
                    <div className="hidden lg:flex items-center gap-12">
                        <div className={`flex gap-10 text-[10px] font-bold uppercase tracking-[0.4em] ${isScrolled ? 'text-stone-500' : 'text-white/60'
                            }`}>
                            <Link href="/portfolio" className="hover:text-stone-900 transition-colors cursor-pointer">Collection</Link>
                            <Link href="/locations" className="hover:text-stone-900 transition-colors cursor-pointer">Locations</Link>
                            <Link href="/contact" className="hover:text-stone-900 transition-colors cursor-pointer">Concierge</Link>
                        </div>

                        <div className="h-8 w-[1px] bg-stone-200/30 mx-2" />

                        <div className="flex items-center gap-6">
                            <button className={`p-2 transition-all hover:scale-110 ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
                                <Search className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(true)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all hover:bg-stone-900 hover:text-white group ${isScrolled
                                    ? 'border-stone-200 text-stone-900'
                                    : 'border-white/20 text-white backdrop-blur-md'
                                    }`}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest">Open Menu</span>
                                <Menu className="w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`lg:hidden p-3 rounded-full transition-all active:scale-90 ${isScrolled ? 'bg-stone-100 text-stone-900 shadow-sm' : 'bg-white/10 text-white backdrop-blur-md'
                            }`}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Ultra-Luxe Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-stone-950 flex flex-col overflow-hidden"
                    >
                        {/* Background Text Decal - Premium Aesthetic */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] flex items-center justify-center">
                            <div className="relative h-[20vw] w-[60vw] max-h-[200px] max-w-[600px] brightness-0 invert select-none opacity-20">
                                <Image
                                    src="/logoheader.png"
                                    alt="WECAP Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Header */}
                        <header className="px-6 lg:px-16 py-8 flex justify-between items-center relative z-10 w-full">
                            <Link href="/" onClick={() => setIsOpen(false)} className="relative h-16 w-48 md:h-32 md:w-96 brightness-0 invert">
                                <Image
                                    src="/logoheader.png"
                                    alt="WECAP Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-white group"
                            >
                                <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Close</span>
                                <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:bg-white group-hover:text-stone-950 transition-all">
                                    <X className="w-6 h-6 rotate-0 group-hover:rotate-90 transition-transform" />
                                </div>
                            </button>
                        </header>

                        {/* Main Menu Links */}
                        <div className="flex-1 flex flex-col justify-center px-6 lg:px-32 relative z-10 overflow-y-auto pt-10 pb-20 mt-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                                <div className="space-y-8 lg:space-y-4">
                                    {menuItems.map((item, i) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="group block"
                                            >
                                                <div className="flex items-center gap-6 mb-2">
                                                    <span className="w-0 h-[1px] bg-sky-500 transition-all group-hover:w-16" />
                                                    <p className="text-stone-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-0 group-hover:text-white transition-colors">0{i + 1}</p>
                                                </div>
                                                <div className="flex items-baseline gap-6 overflow-hidden">
                                                    <h2 className={`${playfair.className} text-4xl sm:text-6xl lg:text-8xl text-white font-medium tracking-tighter transition-all group-hover:italic group-hover:pl-6 group-hover:text-sky-400`}>
                                                        {item.name}
                                                    </h2>
                                                </div>
                                                <p className="hidden md:block text-stone-600 text-sm font-light mt-4 max-w-xs group-hover:text-stone-400">
                                                    {item.subtitle}
                                                </p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sidebar Info in Menu */}
                                <div className="hidden sm:flex flex-col justify-end space-y-12 pb-12 lg:border-l border-white/5 lg:pl-20">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Concierge Desk</h4>
                                        <p className="text-stone-400 text-2xl font-light leading-relaxed max-w-sm">
                                            Access priority booking & private viewings across Egypt.
                                        </p>
                                        <Link href="tel:+201002345678" className={`${playfair.className} text-3xl text-white hover:text-sky-500 transition-colors`}>+20 100 234 5678</Link>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Location</h4>
                                        <p className="text-stone-500 text-sm leading-relaxed">
                                            Allegria Hub, Sodic West, Sheikh Zayed<br /> Cairo, Egypt.
                                        </p>
                                    </div>

                                    <div className="flex gap-10">
                                        <Instagram className="w-5 h-5 text-stone-600 hover:text-white transition-all hover:scale-125 cursor-pointer" />
                                        <Linkedin className="w-5 h-5 text-stone-600 hover:text-white transition-all hover:scale-125 cursor-pointer" />
                                        <Globe className="w-5 h-5 text-stone-600 hover:text-white transition-all hover:scale-125 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer in Menu */}
                        <footer className="px-6 lg:px-16 py-10 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6">
                            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-700">© 2026 WECAP &middot; Signature Real Estate</p>
                            <div className="flex gap-8">
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-700 hover:text-white transition-colors cursor-pointer">Privacy</span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-700 hover:text-white transition-colors cursor-pointer">Terms</span>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    )
}
