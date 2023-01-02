import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.nextUrl.origin))
}

export const config = {
  matcher: ['/go'],
}
