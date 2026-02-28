'use client'

import Image from 'next/image'
import { Playfair_Display } from "next/font/google";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Footer() {
    const pathname = usePathname()

    // Hide Footer on admin routes
    if (pathname?.startsWith('/admin')) return null

    return (
        <footer className="bg-stone-950 pt-32 pb-12 px-6 lg:px-24 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 items-start mb-24 max-w-[1800px] mx-auto">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="relative h-32 w-[400px] brightness-0 invert opacity-90">
                        <Image
                            src="/logofotter.png"
                            alt="WECAP Logo"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                    <p className="text-stone-400 font-light text-lg max-w-sm leading-relaxed">
                        The standard-bearer for luxury residential rentals in Cairo's most exclusive districts.
                    </p>
                    <div className="flex flex-wrap gap-x-10 gap-y-4 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
                        <a href="https://www.facebook.com/profile.php?id=61581203007304" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Facebook</a>
                        <a href="https://www.instagram.com/wecaphotelapartment?igsh=enI0dGd1ZWp3Z3oy&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Instagram</a>
                        <a href="https://www.tiktok.com/@wecaphotelapartment?_r=1&_t=ZS-94ISMUTP2Hd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">TikTok</a>
                        <a href="https://youtube.com/@wecaphotelapartment?si=rzhcHZ8p2k_GXtus" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">YouTube</a>
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Company</h4>
                    <ul className="space-y-4 text-stone-400 text-sm font-light">
                        <li>
                            <Link href="/portfolio" className="hover:text-white transition-colors">The Portfolio</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        </li>
                        <li>
                            <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Headquarters</h4>
                    <p className="text-stone-400 text-sm font-light leading-relaxed">
                        Building 42, Allegria Hub,<br />
                        Sodic West, Sheikh Zayed,<br />
                        Giza, Egypt.
                    </p>
                    <div className="text-stone-300 text-sm border-t border-stone-800 pt-6">
                        <a href="tel:01023323000" className="hover:text-white transition-colors">010 23323000</a><br />
                        <a href="mailto:wecap.egy@gmail.com" className="hover:text-white transition-colors">wecap.egy@gmail.com</a>
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto pt-12 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-stone-600 text-[10px] uppercase tracking-widest font-bold">
                    © 2026 WECAP Luxury Rentals. All rights reserved.
                </p>
                <div className="flex gap-8 text-stone-600 text-[10px] uppercase tracking-widest font-bold">
                    <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    )
}
