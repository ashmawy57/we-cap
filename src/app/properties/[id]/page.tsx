import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import BookingWidget from '@/components/BookingWidget'
import { Button } from '@/components/ui/button'
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
    Award
} from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

const PROPERTIES_DATA: Record<string, any> = {
    'prop_villa_beverly_110': {
        id: 'prop_villa_beverly_110',
        name: 'Villa Beverly 110: An Elegant 8-Bedroom Retreat',
        location: 'Sheikh Zayed',
        description: `Welcome to Villa Beverly 110, a stunning and expansive property located in the highly sought-after Beverly Hills Compound. Offering an incredible blend of luxury, comfort, and ample space, this villa is the perfect destination for large families or groups looking for a relaxing and private getaway in Sheikh Zayed.

The Space
Designed to comfortably accommodate large groups without compromising on privacy, the villa features 8 beautifully furnished bedrooms and 6 modern bathrooms.

• 4 Master Suites: Offering premium comfort, exceptional privacy, and en-suite convenience for a truly relaxing stay.
• 4 Spacious Bedrooms: Elegantly designed with plenty of room for family members or guests.
• Additional Room: A flexible extra space that can be utilized based on your group's unique needs.

Outdoor Oasis & Amenities
Step into your own private resort. Villa Beverly 110 features a lush, well-maintained private garden that provides a serene backdrop for your stay. Enjoy sunny afternoons or warm evenings lounging by the spectacular private swimming pool, making every day feel like a vacation.

Property Highlights at a Glance:
• Capacity: 8 Bedrooms (Including 4 Master Suites) + 1 Extra Room
• Bathrooms: 6 well-appointed bathrooms
• Outdoors: Private Swimming Pool & Landscaped Garden
• Vibe: Secure, peaceful, and family-friendly community

Don't miss the opportunity to experience this beautiful home. Book your stay at Villa Beverly 110 today and enjoy an unforgettable retreat!`,
        pricePerNight: 270,
        amenities: [
            { name: 'Private Pool', icon: Waves },
            { name: 'Landscaped Garden', icon: Crown },
            { name: 'Extra Flexible Room', icon: Users },
            { name: 'Secure Community', icon: ShieldCheck },
        ],
        details: [
            { name: '16 guests', icon: Users },
            { name: '8 bedrooms', icon: Bed },
            { name: '6 baths', icon: Bath },
        ],
        images: Array.from({ length: 48 }, (_, i) => `/فيلا بيفرلي 110 (${i + 1}).jpeg`),
        video: '/فيلا بيفرلي 110 (1).mp4'
    },
    'prop_qasr_el_sawah': {
        id: 'prop_qasr_el_sawah',
        name: 'Qasr El Sawah: A Magnificent 9-Bedroom Palace',
        location: 'Sheikh Zayed',
        description: `Welcome to Qasr El Sawah, an exceptional and luxurious retreat nestled in the prestigious Al Tharwa Al Khadraa neighborhood of Sheikh Zayed. Designed for ultimate comfort and privacy, this magnificent villa is the perfect destination for large families, corporate retreats, or group getaways seeking a premium lifestyle experience.

The Space
Spanning a generous layout, the property boasts 9 beautifully appointed bedrooms to accommodate large groups with ease.

• 3 Luxurious Master Suites: Offering absolute privacy, premium comfort, and en-suite facilities.
• 5 Spacious Bedrooms: Designed for restful nights with ample storage and elegant decor.
• 1 Standard Room: Perfect for additional guests or as a cozy single room.

Outdoor Oasis & Amenities
Step outside into your own private haven. Qasr El Sawah features a beautifully landscaped private garden, perfect for morning coffees or evening gatherings. At the heart of the outdoor space is a stunning private swimming pool, offering a refreshing escape during warm sunny days.

Additional Features
For your convenience and peace of mind, the property includes a dedicated Nanny's room complete with its own private bathroom, ensuring privacy for both your family and your domestic staff.

Property Highlights at a Glance:
• Capacity: 9 Bedrooms (Including 3 Master Suites)
• Outdoors: Private Swimming Pool & Lush Garden
• Staff Quarters: Nanny/Maid’s room with a private en-suite bathroom
• Vibe: Exclusive, tranquil, and highly secure

Experience the pinnacle of luxury living and make unforgettable memories at Qasr El Sawah. Book your stay today!`,
        pricePerNight: 500,
        amenities: [
            { name: 'Private Pool', icon: Waves },
            { name: 'Lush Garden', icon: Crown },
            { name: 'Nanny Room + Bath', icon: Users },
            { name: 'Secure Estate', icon: ShieldCheck },
        ],
        details: [
            { name: '18 guests', icon: Users },
            { name: '9 bedrooms', icon: Bed },
            { name: '6 baths', icon: Bath },
        ],
        images: Array.from({ length: 34 }, (_, i) => `/قصر السواح (${i + 1}).jpg`),
    },
    'prop_1': {
        id: 'prop_1',
        name: 'The Obsidian Villa',
        location: 'Sheikh Zayed',
        description: `Nestled in the heart of Sheikh Zayed, The Obsidian Villa offers an unparalleled living experience. This architectural masterpiece features minimalist design with floor-to-ceiling windows, private infinity pool, and state-of-the-art home automation. 

Every corner of this residence has been meticulously curated for the class A client who seeks privacy, elegance, and modern comfort. The open-plan living area flows seamlessly into the manicured gardens, providing a perfect sanctuary from the bustling city.`,
        pricePerNight: 850,
        amenities: [
            { name: 'Wifi', icon: Wifi },
            { name: 'Air Conditioning', icon: Wind },
            { name: 'Security', icon: ShieldCheck },
            { name: 'Coffee Machine', icon: Coffee },
        ],
        details: [
            { name: '8 guests', icon: Users },
            { name: '4 bedrooms', icon: Bed },
            { name: '4.5 baths', icon: Bath },
        ],
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        ]
    },
    'prop_2': {
        id: 'prop_2',
        name: 'Azure Penthouse',
        location: 'New Cairo',
        description: 'Perched high above the city, the Azure Penthouse offers panoramic views of New Cairo\'s skyline. This modern sanctuary features a spacious terrace, private glass-walled office, and a dedicated wellness area.',
        pricePerNight: 620,
        amenities: [
            { name: 'Terrace', icon: Maximize2 },
            { name: 'Modern Kitchen', icon: Coffee },
            { name: 'Central AC', icon: Wind },
            { name: 'High-speed Wifi', icon: Wifi },
        ],
        details: [
            { name: '6 guests', icon: Users },
            { name: '3 bedrooms', icon: Bed },
            { name: '3.5 baths', icon: Bath },
        ],
        images: [
            'https://images.unsplash.com/photo-1600607687940-4e524cb35a33?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
        ]
    },
    'prop_3': {
        id: 'prop_3',
        name: 'Royal Sun Manor',
        location: '6th of October',
        description: 'A legacy estate of grand proportions, Royal Sun Manor is situated on a sprawling lot in 6th of October. Featuring classical architecture, a private park, and a grand ballroom, it is the epitome of luxury living.',
        pricePerNight: 1200,
        amenities: [
            { name: 'Private Park', icon: Waves },
            { name: 'Grand Entrance', icon: Crown },
            { name: 'Security Detail', icon: ShieldCheck },
            { name: 'Wine Cellar', icon: Coffee },
        ],
        details: [
            { name: '12 guests', icon: Users },
            { name: '6 bedrooms', icon: Bed },
            { name: '7 baths', icon: Bath },
        ],
        images: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        ]
    },
    'prop_algaria': {
        id: 'prop_algaria',
        name: 'Al Garia townhouse',
        location: 'Sheikh Zayed',
        description: `Enjoy a luxurious stay in this fully furnished townhouse with hotel-style finishing, located in the prestigious Al Garia compound. The unit offers privacy, comfort, and a stunning view, making it ideal for families and premium short- or long-term stays.

Unit Features:
• 4 spacious bedrooms
• 3 modern bathrooms
• Nanny’s room with a private bathroom
• Private swimming pool
• Elegant reception area with a stylish design
• Fully equipped modern kitchen

This townhouse is thoughtfully designed and furnished to high standards, providing a refined hospitality experience that combines luxury and comfort. Its prime location within Al Garia ensures a peaceful atmosphere with easy access to essential services. An ideal home for those seeking privacy, elegance, and an exceptional living experience.`,
        pricePerNight: 450,
        amenities: [
            { name: 'Private Pool', icon: Waves },
            { name: 'Hotel-Style Finish', icon: Award },
            { name: 'Nanny Room + Bath', icon: Users },
            { name: 'Modern Kitchen', icon: Coffee },
            { name: 'Elegant Reception', icon: Crown },
            { name: 'Gated Security', icon: ShieldCheck },
        ],
        details: [
            { name: '8 guests', icon: Users },
            { name: '4 bedrooms', icon: Bed },
            { name: '3 baths', icon: Bath },
        ],
        images: [
            '/تاون هاوس الجريا (1).jpeg',
            '/تاون هاوس الجريا (2).jpeg',
            '/تاون هاوس الجريا (3).jpeg',
            '/تاون هاوس الجريا (4).jpeg',
            '/تاون هاوس الجريا (5).jpeg',
            '/تاون هاوس الجريا (6).jpeg',
            '/تاون هاوس الجريا (7).jpeg',
            '/تاون هاوس الجريا (8).jpeg',
            '/تاون هاوس الجريا (9).jpeg',
            '/تاون هاوس الجريا (10).jpeg',
            '/تاون هاوس الجريا (11).jpeg',
            '/تاون هاوس الجريا (12).jpeg',
            '/تاون هاوس الجريا (13).jpeg',
            '/تاون هاوس الجريا (14).jpeg',
            '/تاون هاوس الجريا (15).jpeg',
            '/تاون هاوس الجريا (16).jpeg',
            '/تاون هاوس الجريا (17).jpeg',
            '/تاون هاوس الجريا (18).jpeg',
            '/تاون هاوس الجريا (19).jpeg',
            '/تاون هاوس الجريا (20).jpeg',
            '/تاون هاوس الجريا (21).jpeg',
            '/تاون هاوس الجريا (22).jpeg',
            '/تاون هاوس الجريا (23).jpeg',
            '/تاون هاوس الجريا (24).jpeg',
            '/تاون هاوس الجريا (25).jpeg',
            '/تاون هاوس الجريا (26).jpeg',
            '/تاون هاوس الجريا (27).jpeg',
            '/تاون هاوس الجريا (28).jpeg',
            '/تاون هاوس الجريا (29).jpeg',
        ],
        video: '/تاون هاوس الجريا (1).mp4'
    }
}

export async function generateStaticParams() {
    return Object.keys(PROPERTIES_DATA).map(id => ({ id }))
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const property = PROPERTIES_DATA[id] || PROPERTIES_DATA['prop_1']

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
                        {property.details.map((detail: any, idx: number) => (
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
                            src={property.images[0]}
                            alt={property.name}
                            fill
                            className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-stone-900/10" />
                    </div>
                    <div className="hidden lg:grid col-span-4 grid-rows-2 gap-6">
                        <div className="relative rounded-sm overflow-hidden group">
                            <Image src={property.images[1]} alt="Interior" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                        </div>
                        <div className="relative rounded-sm overflow-hidden group bg-stone-900 flex items-center justify-center">
                            <Image src={property.images[2]} alt="Details" fill className="object-cover opacity-50 transition-transform duration-[2s] group-hover:scale-110" />
                            <div className="relative z-10 text-center space-y-4">
                                <Maximize2 className="w-8 h-8 text-white mx-auto" />
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Explore all {property.images.length} Media</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic Video Experience */}
            {property.video && (
                <section className="px-6 lg:px-16 py-8 max-w-[1800px] mx-auto">
                    <div className="relative aspect-video rounded-sm overflow-hidden bg-stone-900 group">
                        <video
                            src={property.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.8] transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.6em]">Cinematic Tour</span>
                            <h2 className={`${playfair.className} text-4xl md:text-6xl text-white font-medium tracking-tighter`}>
                                Experience the <br /> <span className="italic font-light">Atmosphere.</span>
                            </h2>
                        </div>
                    </div>
                </section>
            )}

            {/* Expanded Gallery */}
            <section className="py-32 bg-stone-50 overflow-hidden">
                <div className="px-6 lg:px-16 max-w-[1800px] mx-auto mb-16">
                    <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 block underline decoration-stone-200 underline-offset-8">Visual Index</span>
                    <h3 className={`${playfair.className} text-4xl md:text-6xl font-medium text-stone-900 tracking-tighter`}>
                        The Full <span className="italic">Collection.</span>
                    </h3>
                </div>

                <div className="flex gap-8 overflow-x-auto px-6 lg:px-16 no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                    {property.images.map((img: string, idx: number) => (
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
                            {property.amenities.map((amenity: any, idx: number) => (
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

                    {/* Concierge Banner */}
                    <div className="p-16 bg-stone-950 text-white rounded-sm relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <Crown className="w-10 h-10 text-stone-500" />
                            <h3 className={`${playfair.className} text-3xl md:text-5xl font-semibold leading-tight`}>Need a tailored <br /> arrangement?</h3>
                            <p className="text-stone-500 max-w-sm font-light leading-relaxed">Our residential directors are available for bespoke setups, including private security and concierge inventory.</p>
                            <button className="bg-white text-stone-900 font-bold uppercase tracking-widest text-[10px] px-12 py-8 rounded-sm hover:bg-stone-200">Enquire with Director</button>
                        </div>
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 p-20 opacity-10 pointer-events-none">
                            <Waves className="w-64 h-64" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Widget */}
                <aside className="lg:col-span-5 relative">
                    <BookingWidget pricePerNight={property.pricePerNight} />
                </aside>
            </section>
        </div>
    )
}
