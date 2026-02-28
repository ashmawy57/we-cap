'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Playfair_Display } from "next/font/google"
import { loginAdmin } from '../actions'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function AdminLogin() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const res = await loginAdmin(formData)

        if (res.error) {
            setError(res.error)
            setLoading(false)
        } else {
            router.push('/admin') // Navigate to dashboard after successful login
        }
    }

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center p-6 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
            <div className="relative z-10 w-full max-w-sm bg-white p-10 rounded-sm shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className={`${playfair.className} text-4xl font-black text-stone-900 tracking-tighter`}>WECAP</h1>
                    <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">Admin Portal</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider p-3 mb-6 rounded-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-transparent"
                            placeholder="e.g. admin"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full border-b border-stone-200 py-3 text-stone-900 outline-none focus:border-stone-900 transition-colors bg-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-stone-900 text-white font-bold uppercase tracking-widest text-[10px] p-5 hover:bg-stone-800 transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Authenticating...' : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    )
}
