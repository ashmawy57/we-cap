import { Playfair_Display } from "next/font/google";
import Image from 'next/image'
import Link from 'next/link'
import BookingWidget from '@/components/BookingWidget'
import {
    MapPin,
    Users,
    Bed,
    Bath,
    Wifi,
    Wind,
    Coffee,
    ShieldCheck,
    Maximize2,
    Crown,
    Waves,
    Award,
    Sparkles
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

const AMENITY_ICONS: Record<string, any> = {
    'Wifi': Wifi,
    'Air Conditioning': Wind,
    'Security': ShieldCheck,
    'Coffee Machine': Coffee,
    'Private Pool': Waves,
    'Pool': Waves,
    'Garden': Crown,
    'Gym': Award,
    'Parking': ShieldCheck
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch property from Supabase
    const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !property) {
        return notFound()
    }

    // Map string amenities to icons
    const amenities = property.amenities.map((name: string) => ({
        name,
        icon: AMENITY_ICONS[name] || Sparkles
    }))

    // Map technical details
    const details = [
        { name: `${property.max_guests || 0} guests`, icon: Users },
        { name: `${property.bedrooms || 0} bedrooms`, icon: Bed },
        { name: `${property.bathrooms || 0} baths`, icon: Bath },
    ]

    return (
        <div className="bg-white min-h-screen">
            {/* Editorial Header */}
            <section className="px-6 lg:px-16 pt-32 pb-12 max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">
                            <MapPin className="w-4 h-4 text-stone-900" />
                            <span>{property.location} &middot; Gated Excellence</span>
                        </div>
                        <h1 className={`${playfair.className} text-6xl md:text-[8vw] font-black text-stone-900 leading-[0.85] tracking-tighter`}>
                            {property.name.split(' ')[0]} <br /> <span className="italic font-light opacity-80">{property.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>

                    <div className="hidden lg:flex items-center gap-12 pb-6 border-b border-stone-100">
                        {details.map((detail: any, idx: number) => (
                            <div key={idx} className="flex flex-col gap-2">
                                <detail.icon className="w-5 h-5 text-stone-900" />
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-400">{detail.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cinematic Gallery Grid */}
            <section className="px-6 lg:px-16 py-8 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-12 gap-6 h-[80vh]">
                    <div className="col-span-12 lg:col-span-8 relative rounded-sm overflow-hidden group">
                        <Image
                            src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                            alt={property.name}
                            fill
                            className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-stone-900/10" />
                    </div>
                    <div className="hidden lg:grid col-span-4 grid-rows-2 gap-6">
                        <div className="relative rounded-sm overflow-hidden group">
                            <Image src={property.images[1] || property.images[0]} alt="Interior" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                        </div>
                        <div className="relative rounded-sm overflow-hidden group bg-stone-900 flex items-center justify-center">
                            <Image src={property.images[2] || property.images[0]} alt="Details" fill className="object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-110" />
                            <div className="relative z-10 text-center space-y-4">
                                <Maximize2 className="w-8 h-8 text-white mx-auto" />
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Explore all {property.images?.length || 0} Media</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expanded Gallery */}
            <section className="py-32 bg-stone-50 overflow-hidden">
                <div className="px-6 lg:px-16 max-w-[1800px] mx-auto mb-16">
                    <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block underline decoration-stone-200 underline-offset-8">Visual Index</span>
                    <h3 className={`${playfair.className} text-4xl md:text-6xl font-medium text-stone-900 tracking-tighter`}>
                        The Full <span className="italic">Collection.</span>
                    </h3>
                </div>

                <div className="flex gap-8 overflow-x-auto px-6 lg:px-16 no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                    {property.images?.map((img: string, idx: number) => (
                        <div key={idx} className="flex-shrink-0 w-[400px] aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl shadow-stone-200/50">
                            <Image
                                src={img}
                                alt={`${property.name} - View ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-[2s] hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content & Reservation Sidebar */}
            <section className="max-w-[1800px] mx-auto px-6 lg:px-16 py-32 grid grid-cols-1 lg:grid-cols-12 gap-32">
                <div className="lg:col-span-7 space-y-32">
                    {/* Narrative */}
                    <div className="max-w-xl">
                        <h3 className={`${playfair.className} text-4xl font-semibold mb-10`}>The Narrative.</h3>
                        <p className="text-stone-500 text-xl font-light leading-relaxed first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>

                    {/* Amenities Module */}
                    <div className="space-y-16">
                        <div className="flex justify-between items-end border-b border-stone-100 pb-8">
                            <h3 className={`${playfair.className} text-4xl font-semibold`}>Asset Controls & <br /> <span className="italic">Provisions.</span></h3>
                            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">Digital Inventory List</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            {amenities.map((amenity: any, idx: number) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-stone-50 border border-stone-100 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                                        <amenity.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">{amenity.name}</h4>
                                        <p className="text-stone-400 text-xs font-light">Class A Standard Certified</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Sidebar Widget */}
                <aside className="lg:col-span-5 relative">
                    <BookingWidget pricePerNight={property.price_per_night || 0} propertyName={property.name} location={property.location} />
                </aside>
            </section>
        </div>
    )
}
