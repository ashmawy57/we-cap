'use server'

import { cookies } from 'next/headers'

export async function loginAdmin(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const validUsername = process.env.ADMIN_USERNAME || 'admin'
    const validPassword = process.env.ADMIN_PASSWORD || 'WestCapital2026!'
    const validSecret = process.env.ADMIN_SECRET || 'west-capital-admin-secret-key-2026'

    if (username === validUsername && password === validPassword) {
        const cookieStore = await cookies()
        cookieStore.set('admin_token', validSecret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })
        return { success: true }
    }

    return { error: 'Invalid username or password' }
}

export async function logoutAdmin() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_token')
}
