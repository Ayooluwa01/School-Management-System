import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from "jwt-decode"



export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/Login') || pathname.startsWith('/Signup')) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refreshToken')?.value; 

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }
  
    return NextResponse.next();
}
export const config = {
   matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}