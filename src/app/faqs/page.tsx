'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from "next/font/google";
import { ChevronDown } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

const faqs = [
    {
        question: "Can I stay with my fiancé/Boyfriend/girlfriend?",
        answer: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Following the Egyptian Law, if any of the couple holds an Arab passport, a marriage certificate will be required to stay together.</li>
                <li>Following the Egyptian law, if any of a couple is Egyptian or Arab, they must submit an official marriage proof – “Orfi” or any unofficial documents are not allowed.</li>
                <li>Non-Arab passport holders are welcomed without the need of marriage certificate.</li>
            </ul>
        )
    },
    {
        question: "Are visits allowed?",
        answer: "For Arab guests, visitors are only allowed if of the same gender, or if mixed, then to be relatives of the 1st or 2nd degree otherwise to meet in public areas."
    },
    {
        question: "Do you allow pets?",
        answer: "It depends on each Nest policy."
    },
    {
        question: "Is there any kinds of discounts?",
        answer: "It depends on the duration, we have a daily rate, weekly and monthly discounts."
    },
    {
        question: "What are the amenities provided?",
        answer: "We offer the cooking essentials and toiletries, hotel grade necessities (I-g: sugar, tea & coffee, tissue paper and cleaning once a week)"
    },
    {
        question: "Can I see the space before confirming the reservation?",
        answer: "We provide up-to-date real-life pictures, if you still need to visit the space, reach out to us to setup an appointment to review the unit if it’s not booked."
    },
    {
        question: "Where are your spaces located?",
        answer: "You can view the district locations and the exact location will be sent after confirming the reservation."
    },
    {
        question: "Is WIFI internet available and reliable?",
        answer: "Yes, WIFI is available at all our spaces and we frequently test them to make sure they work perfectly"
    },
    {
        question: "How can I make/confirm a reservation?",
        answer: (
            <ul className="list-disc pl-5 space-y-2">
                <li>You can submit a booking request or make an instant booking by settling the reservation full amount.</li>
                <li>You can approach us via phone call or WhatsApp.</li>
            </ul>
        )
    },
    {
        question: "Are there any extra charges or fees?",
        answer: (
            <ul className="list-disc pl-5 space-y-2">
                <li>There is an additional cleaning fee for extra cleaning [more than one time per week]</li>
                <li>There is an insurance amount to be paid upon check-in that will be refunded once we’ve completed a check of the property after your stay with no changes.</li>
            </ul>
        )
    }
]

export default function FAQsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className="bg-white selection:bg-stone-900 selection:text-white min-h-screen">
            {/* --- HERO --- */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-48 lg:pt-64 pb-24 overflow-hidden bg-stone-950">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/FAQs.webp"
                        alt="FAQs Background"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-6 border border-white/20 px-6 py-2 rounded-full backdrop-blur-md">
                            Frequently Asked Questions
                        </span>
                        <h1 className={`${playfair.className} text-5xl sm:text-7xl lg:text-8xl text-white font-medium leading-[0.9] tracking-tighter`}>
                            How Can We <br /><span className="italic font-light text-stone-300">Assist You?</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* --- FAQs LIST --- */}
            <section className="py-24 md:py-40 px-6 lg:px-24 max-w-[1200px] mx-auto">
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="border-b border-stone-200"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center py-8 text-left group"
                            >
                                <div className="flex items-start gap-6">
                                    <span className="text-stone-300 font-bold text-sm tracking-widest mt-1">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h3 className={`${playfair.className} text-2xl md:text-3xl text-stone-900 font-medium group-hover:text-stone-600 transition-colors pr-8`}>
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className={`p-3 rounded-full border border-stone-200 transition-all duration-500 shrink-0 ${openIndex === index ? 'bg-stone-900 text-white rotate-180' : 'bg-transparent text-stone-500 group-hover:bg-stone-50'}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-10 pl-12 md:pl-16 pr-4 text-stone-500 text-base md:text-lg font-light leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
