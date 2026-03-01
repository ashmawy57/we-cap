'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Playfair_Display } from "next/font/google";

import {
  ArrowRight,
  MapPin,
  ChevronRight,
  Maximize2,
  Award,
  ShieldCheck,
  Crown,
  Waves,
  Loader2,
  Calendar,
  Users,
  Search
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function LandingPage() {
  const containerRef = useRef(null)
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([])
  const [countsByLocation, setCountsByLocation] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  // Search State
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [activeDropdown, setActiveDropdown] = useState<'location' | 'guests' | null>(null)

  const locations = ["Sheikh Zayed", "Down Town", "New Cairo", "North Coast", "Red Sea"]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('is_active', true)
        .limit(3)
        .order('created_at', { ascending: false })

      if (data) setFeaturedProperties(data)
      setLoading(false)
    }

    async function fetchCounts() {
      const { data } = await supabase
        .from('properties')
        .select('location')
        .eq('is_active', true)

      if (data) {
        const counts: Record<string, number> = {}
        data.forEach(p => {
          counts[p.location] = (counts[p.location] || 0) + 1
        })
        setCountsByLocation(counts)
      }
    }

    fetchFeatured()
    fetchCounts()
  }, [])

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-white selection:bg-stone-900 selection:text-white overflow-x-hidden">

      {/* --- CINEMATIC FULLSCREEN HERO --- */}
      <section className="relative min-h-[130vh] flex items-start justify-center pt-32 md:pt-40 pb-32 z-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
            <Image
              src="/herosection.png"
              alt="Luxury Architecture"
              fill
              className="object-cover brightness-[0.6] contrast-[1.1]"
              priority
            />
          </motion.div>
        </div>

        {/* Floating Accent Text */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block">
          <p className="text-white/20 text-[10px] uppercase font-bold tracking-[1em] [writing-mode:vertical-lr] rotate-180">
            ESTABLISHED IN 2015 &middot; CAIRO EGYPT
          </p>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="relative z-10 text-center px-6 max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10"
          >
            <span className="inline-block text-white/60 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 border border-white/20 px-8 py-3 rounded-full backdrop-blur-xl">
              Stay Smart, Stay WeCap.
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.5
                }
              }
            }}
            className={`${playfair.className} text-white font-black tracking-tighter mb-12 flex flex-col items-center gap-6 md:gap-8`}
          >
            <div className="text-5xl sm:text-7xl md:text-[10vw] lg:text-[12vw] leading-[0.9] md:leading-none">
              {"WECAP.".split("").map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="text-2xl sm:text-4xl md:text-[4vw] lg:text-[5vw] leading-none opacity-90 italic font-light tracking-normal">
              {"Hospitality Services".split("").map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-white/70 text-[10px] sm:text-xs md:text-lg font-light mb-12 md:mb-16 max-w-2xl mx-auto tracking-[0.2em] md:tracking-[0.3em] uppercase px-4"
          >
            Modern serviced apartments designed for comfort & style.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center mb-24">
            <Link
              href="/portfolio"
              className="group relative px-10 py-5 w-auto text-center md:w-auto md:px-16 md:py-8 bg-white text-stone-900 rounded-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">Discover Collection</span>
              <div className="absolute inset-0 bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>

            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-[1px] bg-white/30" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
                Egypt's Premier Agency
              </p>
            </div>
          </div>

          {/* Dismiss Dropdown Overlay */}
          {activeDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveDropdown(null)}
            />
          )}

          {/* --- PREMIUM SEARCH BAR --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="w-full max-w-6xl mx-auto relative z-50 px-4 sm:px-6"
          >
            <div className="bg-white/95 backdrop-blur-3xl rounded-[2rem] md:rounded-[4rem] shadow-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch justify-between border border-white/40 relative">

              {/* Location */}
              <div
                className="flex-1 px-6 md:px-8 py-3 md:py-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50/50 transition-colors cursor-pointer rounded-t-[1.5rem] md:rounded-tr-none md:rounded-l-[2rem] relative"
                onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
              >
                <div className="p-2 md:p-3 bg-stone-50 rounded-full">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-stone-400" />
                </div>
                <div className="text-left">
                  <p className="text-stone-900 font-bold text-xs md:text-sm tracking-tight">Location</p>
                  <p className="text-stone-400 text-[10px] md:text-[11px] font-medium tracking-wide">
                    {searchParams.location || "Where are you going?"}
                  </p>
                </div>

                {/* Location Dropdown */}
                {activeDropdown === 'location' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 md:mt-4 w-full md:w-64 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden z-[60]"
                  >
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSearchParams({ ...searchParams, location: loc })
                          setActiveDropdown(null)
                        }}
                        className="px-6 py-3 md:py-4 hover:bg-stone-50 text-stone-600 text-sm font-medium transition-colors border-b border-stone-50 last:border-0"
                      >
                        {loc}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Check In */}
              <div className="flex-1 px-6 md:px-8 py-3 md:py-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50/50 transition-colors cursor-pointer relative">
                <div className="p-2 md:p-3 bg-stone-50 rounded-full">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-stone-400" />
                </div>
                <div className="text-left flex flex-col flex-1">
                  <p className="text-stone-900 font-bold text-xs md:text-sm tracking-tight">Check in</p>
                  <input
                    type="date"
                    className="text-stone-400 text-[10px] md:text-[11px] font-medium tracking-wide bg-transparent outline-none cursor-pointer w-full focus:ring-0"
                    onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex-1 px-6 md:px-8 py-3 md:py-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50/50 transition-colors cursor-pointer relative">
                <div className="p-2 md:p-3 bg-stone-50 rounded-full">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-stone-400" />
                </div>
                <div className="text-left flex flex-col flex-1">
                  <p className="text-stone-900 font-bold text-xs md:text-sm tracking-tight">Check out</p>
                  <input
                    type="date"
                    className="text-stone-400 text-[10px] md:text-[11px] font-medium tracking-wide bg-transparent outline-none cursor-pointer w-full focus:ring-0"
                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  />
                </div>
              </div>

              {/* Guests */}
              <div
                className="flex-1 px-6 md:px-8 py-3 md:py-4 flex items-center gap-4 hover:bg-stone-50/50 transition-colors cursor-pointer relative"
                onClick={() => setActiveDropdown(activeDropdown === 'guests' ? null : 'guests')}
              >
                <div className="p-2 md:p-3 bg-stone-50 rounded-full">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-stone-400" />
                </div>
                <div className="text-left">
                  <p className="text-stone-900 font-bold text-xs md:text-sm tracking-tight">Guests</p>
                  <p className="text-stone-400 text-[10px] md:text-[11px] font-medium tracking-wide">
                    {searchParams.guests} {searchParams.guests === 1 ? 'Guest' : 'Guests'}
                  </p>
                </div>

                {/* Guests Dropdown */}
                {activeDropdown === 'guests' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 md:mt-4 w-full md:w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 p-4 z-[60]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-bold text-sm">Guests</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSearchParams({ ...searchParams, guests: Math.max(1, searchParams.guests - 1) })
                          }}
                          className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-stone-900 font-bold">{searchParams.guests}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSearchParams({ ...searchParams, guests: searchParams.guests + 1 })
                          }}
                          className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Search Button */}
              <Link
                href={`/portfolio?location=${searchParams.location}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`}
                className="m-2 md:m-0 md:ml-2 p-4 md:p-5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl md:rounded-full transition-all hover:scale-[1.02] md:hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center font-bold text-xs md:text-base gap-3 overflow-hidden"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
                <span className="md:hidden">Search Properties</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* --- FEATURED DESTINATIONS SECTION --- */}
      <section className="py-20 md:py-32 bg-white">
        <div className="px-6 lg:px-24 max-w-[1800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className={`${playfair.className} text-4xl md:text-6xl text-stone-900 font-medium mb-6 tracking-tight`}>
              Discover Your Next Destinations
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            </p>
          </motion.div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-3 md:gap-8 mb-20 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0 pb-10 lg:pb-0">
            {[
              { name: "Sheikh Zayed", image: "/sheikh zayed.jpg", fullName: "Sheikh Zayed" },
              { name: "New Cairo", image: "/new cairo.webp", fullName: "New Cairo" },
              { name: "Down Town", image: "/down town.webp", fullName: "Cairo Downtown" },
              { name: "North Coast", image: "/north coast.jpg", fullName: "North Coast" },
              { name: "Red Sea", image: "/red sea.jpg", fullName: "Red Sea" },
            ].map((dest, i) => {
              const countKey = dest.name.toUpperCase().replace(' ', '_')
              const count = countsByLocation[countKey] || 0
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group cursor-pointer min-w-[31%] sm:min-w-[22%] lg:min-w-0 snap-start"
                >
                  <Link href={`/portfolio?location=${dest.name}`}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                        <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-1 drop-shadow-lg`}>
                          {dest.name}
                        </h3>
                        <p className="text-xs md:text-sm font-medium tracking-widest uppercase opacity-90">
                          {dest.fullName.split(' ')[1] || dest.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                      <h4 className="text-stone-900 font-bold text-lg mb-1">{dest.fullName}</h4>
                      <div className="flex items-center justify-center gap-2 text-stone-400">
                        <div className="p-1 bg-stone-100 rounded-lg">
                          <MapPin className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">{count} LOCATIONS</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/locations"
              className="inline-flex items-center gap-3 px-10 py-5 bg-stone-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <span>Explore Locations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- VERTICAL SCROLL REVEAL: COLLECTION --- */}
      <section className="py-20 md:py-40 bg-stone-50">
        <div className="px-6 lg:px-24 max-w-[1800px] mx-auto">
          <div className="flex flex-row justify-between items-end mb-16 md:mb-32 gap-4 md:gap-12">
            <div className="max-w-3xl">
              <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block underline decoration-stone-200 underline-offset-8">Collection 2026/27</span>
              <h2 className={`${playfair.className} text-4xl sm:text-6xl md:text-[7vw] font-medium text-stone-900 leading-[0.9] tracking-tighter`}>
                Stay Inspired <br /> <span className="italic font-light"></span>
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group flex flex-col items-end gap-2 text-stone-900 pb-2 border-b-2 border-stone-900 shrink-0"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-right">Enter the Gallery</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 pb-8 md:pb-0">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-stone-900 animate-spin" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Loading Latest Acquisitions...</p>
              </div>
            ) : featuredProperties.map((prop, idx) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2, duration: 1 }}
                className="group min-w-[75vw] md:min-w-0 snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-8 shadow-2xl shadow-stone-200/50">
                  <Image
                    src={prop.images[0] || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'}
                    alt={prop.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />
                  <div className="absolute top-8 left-8 flex gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-white bg-white/20 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                      {prop.property_type || 'Villa'}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-12 text-center translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <Link href={`/properties/${prop.id}`} className="inline-block px-10 py-5 bg-white text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:bg-stone-100 transition-colors">
                      View Asset Details
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-stone-400 text-[9px] uppercase font-bold tracking-[0.4em] mb-2">{prop.location.replace('_', ' ')}</p>
                      <h3 className={`${playfair.className} text-3xl font-semibold`}>{prop.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-900 font-black text-xl">${prop.price_per_night}</p>
                      <p className="text-[9px] uppercase font-bold text-stone-400 tracking-widest mt-1">NIGHTLY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-stone-400">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{prop.address || 'Location Verified'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CINEMATIC PHILOSOPHY SECTION --- */}
      <section className="relative py-20 md:py-60 px-6 lg:px-24 bg-white overflow-hidden">
        {/* Background Subtle Text */}
        <div className="absolute top-20 md:top-40 left-0 w-full pointer-events-none opacity-[0.02] select-none">
          <h2 className={`${playfair.className} text-[30vw] md:text-[25vw] font-black leading-none whitespace-nowrap`}>
            EXCELLENCE
          </h2>
        </div>

        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          {/* Image Parallax Block */}
          <div className="lg:col-span-6 relative order-1 lg:order-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group cursor-none"
            >
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden z-20 shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
                <Image
                  src="/who we are.png"
                  alt="Luxury Interior"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110 saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Floating Digital Quote Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute -bottom-10 -right-4 md:-bottom-20 md:-right-6 lg:-right-12 z-30 bg-stone-950 text-white p-6 md:p-14 max-w-[280px] sm:max-w-xs md:max-w-md shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <Waves className="w-6 h-6 md:w-8 md:h-8 text-sky-400 opacity-60" />
                  <div className="h-[1px] w-8 md:w-12 bg-white/20" />
                </div>
                <p className={`${playfair.className} text-lg md:text-2xl font-light leading-relaxed`}>
                  To become the leading hospitality platform, setting new standards in service excellence, innovation, and guest satisfaction.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-5 lg:col-start-8 mt-12 lg:mt-0 space-y-12 md:space-y-20 relative z-10">
            <div className="flex flex-row justify-between items-end gap-4">
              <div className="space-y-6 md:space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-12 h-[1px] bg-stone-900" />
                  <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em]"></span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className={`${playfair.className} text-4xl sm:text-6xl md:text-8xl text-stone-900 font-medium leading-[1] md:leading-[0.9] tracking-tighter`}
                >
                  WeCap <br />
                  <span className="relative inline-block">
                    <span className="italic font-light text-stone-400">who we are</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="absolute -bottom-4 left-0 w-full h-[2px] bg-sky-500/30 origin-left"
                    />
                  </span>.
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="shrink-0"
              >
                <Link
                  href="/about"
                  className="group flex flex-col items-end gap-2 text-stone-900 pb-2 border-b-2 border-stone-900"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-right">Read Our Story</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-6 md:space-y-8 text-stone-500 text-lg md:text-xl font-light leading-relaxed"
            >
              <p>
                Founded in 2015, we are a hospitality-driven company built on one simple belief: every guest deserves to feel at home.
              </p>
              <p className="text-stone-400 text-sm md:text-base">
                From day one, our focus has been on delivering exceptional hospitality services that combine professionalism, comfort, and attention to detail. We are passionate about creating seamless experiences where quality meets warmth.
              </p>
            </motion.div>


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

      {/* --- FINAL CALL: THE SANCTUARY --- */}
      <section className="py-32 md:py-60 relative flex items-center justify-center text-center overflow-hidden">
        {/* White Shadow/Glow Effect between sections */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent z-20 pointer-events-none" />

        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2400"
            alt="Final Call"
            fill
            className="object-cover brightness-[0.4]"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10 px-6 max-w-5xl space-y-16"
        >
          <h2 className={`${playfair.className} text-4xl sm:text-6xl md:text-[8vw] lg:text-[10vw] text-white font-medium leading-[0.9] tracking-tighter`}>
            Elevate your <br /> <span className="italic font-light text-stone-400">lifestyle standards.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 md:gap-10 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-white text-stone-900 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-stone-100 transition-all hover:px-20"
            >
              Speak with a Specialist
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 border border-white/20 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 transition-all"
            >
              View Collection
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
