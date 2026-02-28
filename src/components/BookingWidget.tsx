'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { format, differenceInDays, intervalToDuration } from 'date-fns'
import {
    Calendar as CalendarIcon,
    Users,
    ChevronDown,
    Info,
    Zap,
    ShieldCheck,
    TrendingUp,
    Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import CheckoutModal from './CheckoutModal'
import { DateRange } from 'react-day-picker'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from "next/font/google";


const playfair = Playfair_Display({ subsets: ['latin'] })

interface BookingWidgetProps {
    pricePerNight: number
    currency?: string
}

export default function BookingWidget({ pricePerNight, currency = 'EGP' }: BookingWidgetProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })
    const [guests, setGuests] = useState('1')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [viewers, setViewers] = useState(2)

    // Luxury scarcity simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(prev => Math.max(1, Math.min(6, prev + (Math.random() > 0.5 ? 1 : -1))))
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const duration = useMemo(() => {
        if (!date?.from || !date?.to) return null
        return intervalToDuration({ start: date.from, end: date.to })
    }, [date])

    const nights = useMemo(() => {
        if (!date?.from || !date?.to) return 0
        return differenceInDays(date.to, date.from)
    }, [date])

    const durationText = useMemo(() => {
        if (!duration) return ''
        const parts = []
        if (duration.years) parts.push(`${duration.years} ${duration.years === 1 ? 'Year' : 'Years'}`)
        if (duration.months) parts.push(`${duration.months} ${duration.months === 1 ? 'Month' : 'Months'}`)
        if (duration.days) parts.push(`${duration.days} ${duration.days === 1 ? 'Day' : 'Days'}`)

        // If it's just nights (e.g. less than a day in calculation but differenceInDays is 1+)
        if (parts.length === 0 && nights > 0) parts.push(`${nights} Nights`)

        return parts.join(', ')
    }, [duration, nights])

    const subtotal = nights * pricePerNight
    const cleaningFee = 500
    const totalPrice = subtotal + (nights > 0 ? cleaningFee : 0)

    return (
        <div className="sticky top-32 z-50">
            {/* Live Activity Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-sm border border-amber-100/50 shadow-sm"
            >
                <div className="relative">
                    <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                    <span className="absolute inset-0 animate-ping h-2 w-2 rounded-full bg-amber-400 opacity-75" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                    {viewers} High-Value clients are viewing this asset now
                </p>
            </motion.div>

            <Card className="w-full border-stone-100 shadow-[0_40px_80px_rgba(0,0,0,0.08)] rounded-sm overflow-hidden bg-white">
                <CardHeader className="p-10 pb-6 border-b border-stone-50">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-serif font-black text-stone-900 leading-none tracking-tight">
                                    {pricePerNight.toLocaleString()}
                                </span>
                                <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[9px]">
                                    {currency} / Night
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[9px] uppercase tracking-widest">
                                <TrendingUp className="w-3 h-3" />
                                Best price guaranteed for 2026
                            </div>
                        </div>
                        <div className="p-3 bg-stone-50 rounded-full">
                            <ShieldCheck className="w-5 h-5 text-stone-900" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-10 space-y-8">
                    {/* Inputs Section */}
                    <div className="space-y-6">
                        {/* Date Picker */}
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-stone-400 block ml-1">Stay Period</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full h-16 justify-start text-left font-medium border-stone-100 bg-stone-50 hover:bg-stone-100 group transition-all rounded-sm px-6 ${!date && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-4 h-5 w-5 text-stone-300 group-hover:text-stone-900 transition-colors" />
                                        {date?.from ? (
                                            date.to ? (
                                                <span className="text-stone-900 text-sm font-serif">
                                                    {format(date.from, "MMM dd")} — {format(date.to, "MMM dd")}
                                                </span>
                                            ) : (
                                                <span className="text-sm font-serif">{format(date.from, "MMM dd")}</span>
                                            )
                                        ) : (
                                            <span className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">Select Dates</span>
                                        )}
                                        <ChevronDown className="ml-auto h-4 w-4 text-stone-200" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white border-stone-100 shadow-2xl rounded-sm" align="end">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={1}
                                        disabled={(date) => date < new Date() || date > new Date(2027, 12, 31)}
                                        className="p-6 rounded-sm border-none bg-white scale-110 origin-top"
                                    />
                                    <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-stone-400" />
                                        <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Instant verification active</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Guest Selection */}
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-stone-400 block ml-1">Occupancy Profile</label>
                            <Select value={guests} onValueChange={setGuests}>
                                <SelectTrigger className="w-full h-16 bg-stone-50 border-stone-100 focus:ring-0 text-stone-900 font-serif text-lg rounded-sm px-6">
                                    <div className="flex items-center gap-4">
                                        <Users className="w-5 h-5 text-stone-300" />
                                        <SelectValue placeholder="Select guests" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white border-stone-100 rounded-sm">
                                    <SelectItem value="1">1 Private Client</SelectItem>
                                    <SelectItem value="2">2 Private Clients</SelectItem>
                                    <SelectItem value="3">3 Private Clients</SelectItem>
                                    <SelectItem value="4">4+ Clients (Enquire)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Pricing Details - Animated Layout */}
                    <AnimatePresence>
                        {nights > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: 10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 pt-8 border-t border-stone-100 overflow-hidden"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-stone-400 font-light flex items-center gap-2">
                                            {durationText} &times; {pricePerNight.toLocaleString()}
                                        </span>
                                        <span className="text-stone-900 font-bold">{subtotal.toLocaleString()} {currency}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2 group cursor-help">
                                            <span className="text-stone-400 font-light underline decoration-stone-200 underline-offset-4 decoration-dashed group-hover:decoration-stone-900 transition-colors">Safety & Prep Fee</span>
                                            <Info className="w-3 h-3 text-stone-200" />
                                        </div>
                                        <span className="text-stone-900 font-bold">{cleaningFee} {currency}</span>
                                    </div>
                                </div>

                                <div className="bg-stone-50 p-6 rounded-sm space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900">Total Asset Reserve</span>
                                        <span className={`${playfair.className} text-3xl font-black text-stone-900`}>{totalPrice.toLocaleString()} {currency}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        Priority Concierge Credits Applied
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CTA & Scarcity */}
                    <div className="space-y-6">
                        <Button
                            className="w-full h-20 bg-stone-950 hover:bg-stone-900 text-white font-bold uppercase tracking-[0.4em] text-[11px] transition-all rounded-sm shadow-2xl shadow-stone-950/20 active:scale-[0.98] group"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="flex items-center gap-4">
                                Request Invitation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </span>
                        </Button>

                        <div className="flex flex-col items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[8px] font-black text-stone-400">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-900 flex items-center justify-center text-[8px] font-black text-white">
                                    +14
                                </div>
                            </div>
                            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.3em] text-center leading-relaxed">
                                Join 1,200+ Class A clients <br /> verified this month
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bookingDetails={{
                    nights,
                    totalPrice,
                    startDate: date?.from,
                    endDate: date?.to
                }}
            />
        </div>
    )
}

function ArrowRight({ className }: { className?: string }) {
    return <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
