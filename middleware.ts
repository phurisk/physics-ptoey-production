import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


const ADMIN_PAGE_PREFIX = '/admin'
const ADMIN_API_PREFIX = '/api/admin'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminArea = pathname.startsWith(ADMIN_PAGE_PREFIX)
  const isAdminApi = pathname.startsWith(ADMIN_API_PREFIX)

  if (!isAdminArea && !isAdminApi) {
    return NextResponse.next()
  }


  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as (null | { role?: string })
  const role = token?.role
  const isAdmin = role === 'ADMIN' || role === 'admin'

  if (isAdmin) return NextResponse.next()


  if (isAdminApi) {
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Unauthorized (admin only)' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }


  const url = req.nextUrl.clone()
  url.pathname = '/'
  url.searchParams.set('error', 'admin_only')
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
