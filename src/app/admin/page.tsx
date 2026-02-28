import { Playfair_Display } from "next/font/google"
import { Building2, CalendarCheck, Users, TrendingUp } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function AdminDashboard() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <header className="flex flex-col gap-2 border-b border-stone-200 pb-8">
                <h1 className={`${playfair.className} text-4xl font-semibold`}>Dashboard Overview</h1>
                <p className="text-stone-500 text-sm">Welcome back to the WECAP administration panel.</p>
            </header>

            {/* Stats Grid - Currently just mock data until we hook up to actual supabase fetches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Properties', value: '12', icon: Building2, trend: 'Active portfolio' },
                    { title: 'Total Bookings', value: '48', icon: CalendarCheck, trend: 'All time' },
                    { title: 'Unique Clients', value: '156', icon: Users, trend: 'Registered' },
                    { title: 'Revenue (Est.)', value: 'EGP 1.2M', icon: TrendingUp, trend: 'Current year' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-sm border border-stone-100 shadow-sm flex flex-col gap-4 group hover:border-stone-300 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">{stat.title}</p>
                                <h3 className={`${playfair.className} text-4xl font-semibold text-stone-900 group-hover:translate-x-1 transition-transform`}>{stat.value}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-900">
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-xs text-stone-400 italic font-medium">{stat.trend}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
