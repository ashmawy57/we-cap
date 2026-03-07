'use client'

import { Playfair_Display } from "next/font/google"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
    Building2,
    CalendarCheck,
    LayoutDashboard,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { logoutAdmin } from './actions'

const playfair = Playfair_Display({ subsets: ['latin'] })

const sidebarLinks = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Don't show the sidebar if we're on the login page
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/admin/login')
    }

    return (
        <div className="flex h-screen bg-stone-50 text-stone-900 font-sans">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 z-40">
                <Link href="/" className={`${playfair.className} text-xl font-black tracking-tighter`}>WECAP</Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-stone-900">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-stone-900/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`w-64 bg-white border-r border-stone-200 flex flex-col justify-between fixed top-0 left-0 z-50 h-full transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    {/* Brand header */}
                    <div className="h-24 flex items-center px-8 border-b border-stone-100">
                        <Link href="/" className={`${playfair.className} text-xl font-black tracking-tighter`}>WECAP</Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-2 relative h-[calc(100vh-6rem)] overflow-y-auto">
                        <p className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4 mt-6">Main Menu</p>
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href || (pathname.startsWith(`${link.href}/`) && link.href !== '/admin')
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 ${isActive ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-stone-100 bg-white">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-sm text-xs font-semibold text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        Sign Out
                        <LogOut className="w-4 h-4 opacity-50" />
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 overflow-x-hidden min-h-screen pt-16 md:pt-0">
                <div className="max-w-[1400px] mx-auto p-4 sm:p-8 md:p-12 mb-20 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    )
}
