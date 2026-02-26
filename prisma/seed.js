const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    const properties = [
        {
            name: 'The Obsidian Villa',
            description: 'An architectural masterpiece in Sheikh Zayed with floor-to-ceiling windows, private infinity pool, and state-of-the-art home automation. Perfect for those who seek privacy and elegance.',
            location: 'SHEIKH_ZAYED',
            address: 'Allegria, Sheikh Zayed, Giza',
            pricePerNight: 850,
            amenities: ['Private Pool', 'Home Automation', '24/7 Security', 'Infinity View', 'Garden'],
            images: [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop'
            ],
        },
        {
            name: 'Azure Penthouse',
            description: 'Breathtaking views of the city skyline. This penthouse features a wrap-around terrace, private elevator, and a custom designer kitchen.',
            location: 'SHEIKH_ZAYED',
            address: 'Sodic West, Sheikh Zayed, Giza',
            pricePerNight: 620,
            amenities: ['Penthouse', 'Private Elevator', 'Designer Kitchen', 'City View', 'Wifi'],
            images: [
                'https://images.unsplash.com/photo-1600607687940-4e524cb35a33?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop'
            ],
        },
        {
            name: 'Veranda Garden Suite',
            description: 'Luxury meets nature in this ground-floor suite. Features a private landscaped garden with an outdoor fireplace and direct access to the clubhouse.',
            location: 'SHEIKH_ZAYED',
            address: 'VYE, Sheikh Zayed, Giza',
            pricePerNight: 450,
            amenities: ['Garden', 'Fireplace', 'Clubhouse Access', 'Modern Interior', 'Wine Cellar'],
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
            ],
        },
        {
            name: 'The Ivory Loft',
            description: 'Ultra-modern minimalist loft with double-height ceilings. Bathed in natural light and featuring curated international art pieces.',
            location: 'SHEIKH_ZAYED',
            address: 'Arkan Residences, Sheikh Zayed, Giza',
            pricePerNight: 580,
            amenities: ['High Ceilings', 'Minimalist Design', 'Gym Access', 'Underground Parking', 'Smart TV'],
            images: [
                'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2071&auto=format&fit=crop'
            ],
        },
        {
            name: 'Majestic Royal Manor',
            description: 'A grand estate designed for family gatherings. Includes 6 master suites, a private cinema room, and a professional-grade kitchen.',
            location: 'SHEIKH_ZAYED',
            address: 'Palm Hills, Sheikh Zayed, Giza',
            pricePerNight: 1200,
            amenities: ['Cinema Room', '6 Master Suites', 'Professional Kitchen', 'Steam Room', 'Private Chef Available'],
            images: [
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop'
            ],
        },
    ]

    for (const p of properties) {
        const property = await prisma.property.create({
            data: p,
        })
        console.log(`Created property with id: ${property.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
