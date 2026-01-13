// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get('better-auth.session_token')
    
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/projects/:path*', '/profile/:path*', '/profile/:path*']
}