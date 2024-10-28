import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	// if (request.nextUrl.pathname.startsWith('/auth')) {
	// 	const authCookie = request.cookies.get('token');
	// 	if (!authCookie)
	// 		return NextResponse.redirect(new URL('/login', request.url));
	// }
	// if (request.nextUrl.pathname.startsWith('/login')) {
	// 	const authCookie = request.cookies.get('token');
	// 	if (!authCookie) {
	// 		return NextResponse.next();
	// 	}
	// 	return NextResponse.redirect(new URL('/auth', request.url));
	// }
	// if (request.nextUrl.pathname === '/') {
	// 	return NextResponse.redirect(new URL('/auth', request.url));
	// }
}
