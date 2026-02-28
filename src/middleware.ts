import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    // Protect all /admin routes except the login page
    if (isAdminPath && !isLoginPage) {
        const token = request.cookies.get('admin_token')?.value
        const validToken = process.env.ADMIN_SECRET || 'west-capital-admin-secret-key-2026'

        if (!token || token !== validToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    // Redirect to dashboard if already logged in and trying to access login page
    if (isAdminPath && isLoginPage) {
        const token = request.cookies.get('admin_token')?.value
        const validToken = process.env.ADMIN_SECRET || 'west-capital-admin-secret-key-2026'

        if (token === validToken) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
