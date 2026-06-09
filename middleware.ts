// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Aquí verificas tu cookie de sesión o token de JWT (ej: NextAuth)
  const token = request.cookies.get('admin_token')?.value;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      // Si no está autenticado, redirige al login público
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};