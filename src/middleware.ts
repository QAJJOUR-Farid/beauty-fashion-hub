import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_dev_only"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect Admin Pages
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 2. Protect Admin APIs (Write/Delete operations)
  if (pathname.startsWith('/api/products') || pathname.startsWith('/api/analytics')) {
    // Only protect non-GET requests for products, and all analytics requests
    if (request.method !== 'GET' || pathname.startsWith('/api/analytics')) {
      const token = request.cookies.get('admin_token')?.value;

      if (!token) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }

      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.next();
      } catch (err) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

// Config to match only relevant paths
export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*', '/api/analytics/:path*'],
};
