'use client'

import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { motion } from 'framer-motion'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Footer() {
    return (
        <footer className="bg-stone-950 pt-32 pb-12 px-6 lg:px-24 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 items-start mb-24 max-w-[1800px] mx-auto">
                <div className="col-span-1 md:col-span-2 space-y-8">
                    <div className="relative h-16 w-48 brightness-0 invert">
                        <Image
                            src="/logo.png"
                            alt="West Capital Logo"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                    <p className="text-stone-400 font-light text-lg max-w-sm leading-relaxed">
                        The standard-bearer for luxury residential rentals in Cairo's most exclusive districts.
                    </p>
                    <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
                        <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
                        <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Company</h4>
                    <ul className="space-y-4 text-stone-400 text-sm font-light">
                        <li className="hover:text-white transition-colors cursor-pointer">The Portfolio</li>
                        <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Locations</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
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
                        +20 100 234 5678<br />
                        concierge@west-capital.com
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto pt-12 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-stone-600 text-[10px] uppercase tracking-widest font-bold">
                    © 2026 West Capital Luxury Rentals. All rights reserved.
                </p>
                <div className="flex gap-8 text-stone-600 text-[10px] uppercase tracking-widest font-bold">
                    <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
                </div>
            </div>
        </footer>
    )
}
