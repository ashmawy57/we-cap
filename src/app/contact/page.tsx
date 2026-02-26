'use client'

import { Playfair_Display } from 'next/font/google'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageSquare } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-24">
            <section className="px-6 lg:px-12 max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                {/* Left Side: Info */}
                <div className="space-y-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Personalized Concierge</span>
                        <h1 className={`${playfair.className} text-5xl md:text-8xl font-semibold text-stone-900 leading-tight mb-8`}>
                            How can we <br /><span className="italic font-light">assist you?</span>
                        </h1>
                        <p className="text-stone-500 font-light text-xl leading-relaxed max-w-lg">
                            Whether you are looking for a short-term sanctuary or a long-term residence, our concierge team is ready to provide a bespoke experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-stone-900">
                                <Phone className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Private Line</span>
                            </div>
                            <p className="text-stone-600 font-medium">+20 100 234 5678</p>
                            <p className="text-stone-400 text-xs">Available 24/7 for Class A clients</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-stone-900">
                                <Mail className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">Digital Enquiries</span>
                            </div>
                            <p className="text-stone-600 font-medium font-inter">concierge@west-capital.com</p>
                            <p className="text-stone-400 text-xs">We respond within 2 hours</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-stone-900">
                                <MapPin className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">The Hub</span>
                            </div>
                            <p className="text-stone-600 font-medium">Allegria, Sodic West, Sheikh Zayed</p>
                            <p className="text-stone-400 text-xs">Private meetings by appointment only</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-stone-900">
                                <MessageSquare className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-widest text-[10px]">WhatsApp</span>
                            </div>
                            <p className="text-stone-600 font-medium">+20 100 987 6543</p>
                            <p className="text-stone-400 text-xs">Direct chat for rapid assistance</p>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-stone-100">
                        <div className="flex gap-8">
                            <a href="#" className="p-4 bg-stone-50 rounded-full hover:bg-stone-950 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-4 bg-stone-50 rounded-full hover:bg-stone-950 hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-stone-50 p-8 md:p-16 rounded-sm border border-stone-100"
                >
                    <h3 className={`${playfair.className} text-3xl font-semibold mb-12`}>General Enquiry</h3>

                    <form className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2 border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Full Name</label>
                                <input type="text" placeholder="Johnathan Doe" className="w-full bg-transparent outline-none py-2 text-stone-900 font-medium placeholder:text-stone-200" />
                            </div>
                            <div className="space-y-2 border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-transparent outline-none py-2 text-stone-900 font-medium placeholder:text-stone-200" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2 border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Phone</label>
                                <input type="tel" placeholder="+20 000 000 000" className="w-full bg-transparent outline-none py-2 text-stone-900 font-medium placeholder:text-stone-200" />
                            </div>
                            <div className="space-y-2 border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Interest</label>
                                <select className="w-full bg-transparent outline-none py-2 text-stone-900 font-medium appearance-none cursor-pointer">
                                    <option>Short Term Rental</option>
                                    <option>Long Term Residence</option>
                                    <option>Property Management</option>
                                    <option>Investment Inquiry</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Message</label>
                            <textarea rows={4} placeholder="How can we help you?" className="w-full bg-transparent outline-none py-2 text-stone-900 font-medium placeholder:text-stone-200 resize-none" />
                        </div>

                        <button className="group relative flex items-center justify-center gap-4 w-full py-8 bg-stone-900 text-white font-bold uppercase tracking-[0.3em] text-[11px] overflow-hidden hover:bg-stone-800 transition-all">
                            Send Enquiry
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[10px] text-stone-400 uppercase tracking-widest font-medium">
                        By submitting this form, you agree to our privacy policy.
                    </p>
                </motion.div>
            </section>
        </main>
    )
}
