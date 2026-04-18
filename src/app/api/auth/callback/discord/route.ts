import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  // Define the backend API callback URL
  // We use the direct backend URL to avoid any rewrite issues during the server-side fetch
  const backendUrl = new URL('https://api.gamers.io.kr/api/oauth2/discord/callback');
  backendUrl.searchParams.set('code', code);
  if (state) backendUrl.searchParams.set('state', state);

  try {
    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend authentication failed:', await response.text());
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }

    const result = await response.json();
    
    // Validate the result structure based on our ApiResponse type
    if (!result.data || !result.data.tokens) {
      console.error('Invalid response from backend:', result);
      return NextResponse.redirect(new URL('/login?error=invalid_response', request.url));
    }

    const { access_token, refresh_token } = result.data.tokens;

    // Check if the request expects JSON (AJAX) or a redirect (Browser)
    const acceptHeader = request.headers.get('accept');
    const isJsonRequest = acceptHeader?.includes('application/json') || request.headers.get('x-requested-with') === 'XMLHttpRequest';

    if (isJsonRequest) {
      const jsonResponse = NextResponse.json({ success: true, user: result.data.user });
      
      // Set cookies for the frontend domain
      jsonResponse.cookies.set('access_token', access_token, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
      });

      jsonResponse.cookies.set('refresh_token', refresh_token, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return jsonResponse;
    }

    // Default: Browser redirect
    const nextResponse = NextResponse.redirect(new URL('/', request.url));

    nextResponse.cookies.set('access_token', access_token, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    nextResponse.cookies.set('refresh_token', refresh_token, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    console.error('OAuth proxy error:', error);
    return NextResponse.redirect(new URL('/login?error=proxy_error', request.url));
  }
}
