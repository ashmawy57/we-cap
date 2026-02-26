'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { bookingSchema, BookingFormValues } from '@/lib/validations/booking'
import { Loader2, ShieldCheck, CheckCircle2, Crown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

interface CheckoutModalProps {
    isOpen: boolean
    onClose: () => void
    bookingDetails: {
        nights: number
        totalPrice: number
        startDate?: Date
        endDate?: Date
    }
}

export default function CheckoutModal({ isOpen, onClose, bookingDetails }: CheckoutModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            countryCode: "+20"
        }
    })

    const onSubmit = async (data: BookingFormValues) => {
        // Simulate luxury API processing
        await new Promise(resolve => setTimeout(resolve, 2500))
        console.log('Class A Reservation Request:', { ...data, ...bookingDetails })
        setStep('success')
    }

    const handleClose = () => {
        onClose()
        // Reset state after a delay to allow exit animation
        setTimeout(() => setStep('form'), 500)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-xl bg-white border-none shadow-2xl p-0 overflow-hidden rounded-sm">
                <AnimatePresence mode="wait">
                    {step === 'form' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-10 md:p-14"
                        >
                            <DialogHeader className="mb-12">
                                <div className="flex items-center gap-3 text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
                                    <Crown className="w-4 h-4 text-stone-900" />
                                    <span>Private Invitation</span>
                                </div>
                                <DialogTitle className={`${playfair.className} text-4xl md:text-5xl font-semibold text-stone-900 tracking-tighter leading-tight`}>
                                    Secure your <span className="italic font-light">next sanctuary.</span>
                                </DialogTitle>
                                <p className="text-stone-500 font-light mt-4 text-sm leading-relaxed">
                                    Provide your profile details to initiate a priority reservation request. Our concierge will verify availability within 2 hours.
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-6">
                                    {/* Full Name */}
                                    <div className="group space-y-2 border-b border-stone-100 pb-2 focus-within:border-stone-900 transition-colors">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">Client Designate</label>
                                        <input
                                            {...register('fullName')}
                                            placeholder="Johnathan Spencer"
                                            className="w-full bg-transparent outline-none py-2 text-stone-900 font-serif text-xl placeholder:text-stone-200 placeholder:italic"
                                        />
                                        {errors.fullName && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1">{errors.fullName.message}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="group space-y-2 border-b border-stone-100 pb-2 focus-within:border-stone-900 transition-colors">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">Digital Gateway</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="concierge@luxury.com"
                                            className="w-full bg-transparent outline-none py-2 text-stone-900 font-serif text-xl placeholder:text-stone-200 placeholder:italic"
                                        />
                                        {errors.email && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1">{errors.email.message}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="group space-y-2 border-b border-stone-100 pb-2 focus-within:border-stone-900 transition-colors">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">Priority Contact</label>
                                        <div className="flex gap-4">
                                            <select
                                                {...register('countryCode')}
                                                className="bg-transparent outline-none font-bold text-xs uppercase tracking-widest cursor-pointer"
                                            >
                                                <option value="+20">EG +20</option>
                                                <option value="+1">US +1</option>
                                                <option value="+44">UK +44</option>
                                                <option value="+971">UAE +971</option>
                                            </select>
                                            <input
                                                {...register('phone')}
                                                placeholder="010 000 0000"
                                                className="flex-1 bg-transparent outline-none py-2 text-stone-900 font-serif text-xl placeholder:text-stone-200 placeholder:italic"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                {/* Trust Signal */}
                                <div className="flex items-center gap-4 p-5 bg-stone-50 rounded-sm border border-stone-100">
                                    <ShieldCheck className="w-5 h-5 text-stone-900" />
                                    <p className="text-[10px] text-stone-500 leading-relaxed font-medium uppercase tracking-widest">
                                        Reservation governed by West Capital <span className="text-stone-900">Class A Protocols</span>. No immediate billing.
                                    </p>
                                </div>

                                <DialogFooter className="mt-12 flex flex-col items-center gap-6">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-20 bg-stone-950 text-white font-bold uppercase tracking-[0.5em] text-[11px] hover:bg-stone-900 transition-all rounded-sm group relative overflow-hidden active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center gap-4">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Request Secure Invitation <ArrowRight className="w-4 h-4" /></>}
                                        </span>
                                        <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    </Button>
                                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.3em]">Signature Verification Required on Arrival</p>
                                </DialogFooter>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-16 flex flex-col items-center text-center space-y-10"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-100 blur-2xl rounded-full scale-150 opacity-50" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                    className="relative w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center text-white"
                                >
                                    <CheckCircle2 className="w-12 h-12" />
                                </motion.div>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white"
                                >
                                    <Sparkles className="w-5 h-5 text-amber-400" />
                                </motion.div>
                            </div>

                            <div className="space-y-4">
                                <h3 className={`${playfair.className} text-4xl md:text-5xl font-semibold text-stone-900`}>Enquiry Dispatched.</h3>
                                <p className="text-stone-500 font-light max-w-sm mx-auto leading-relaxed">
                                    Your profile has been prioritized. Our residential director will contact you shortly to finalize the sanctuary details.
                                </p>
                            </div>

                            <div className="w-full pt-10 border-t border-stone-100">
                                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-[0.3em] mb-6">Reservation Reference: WC-2026-XQ9</p>
                                <Button
                                    onClick={handleClose}
                                    className="w-full h-16 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:bg-stone-200 transition-all rounded-sm"
                                >
                                    Return to Collection
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}

function ArrowRight({ className }: { className?: string }) {
    return <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
