// Edge Runtime Compatible Middleware
// This exports a Next.js/App Router compatible middleware

export async function middleware(request) {
  // Skip middleware for static assets and API routes that don't need auth
  const pathname = request.nextUrl.pathname;
  
  // Define paths that don't require authentication
  const publicPaths = ['/login', '/register', '/api/public', '/api/auth/signin', '/api/auth/signup'];
  
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return;
  }

  try {
    const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.cookies.get('authjs.session-token'); // Adjust cookie name as needed

    if (!token) {
      // Return a response redirecting to login or unauthorized response
      return new Response(JSON.stringify({ error: 'Authorization token missing' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify token with auth service using fetch API (Edge Function compatible)
    const response = await fetch(`${AUTH_SERVICE_URL}/api/auth/session`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();

    if (data && data.session) {
      // Token is valid, continue with request
      // Optionally, you can pass user info to the next handler if needed
      return;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Token validation error:', error.message);
    return new Response(JSON.stringify({ error: 'Token validation failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Define which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};