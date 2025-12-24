import { NextRequest, NextResponse } from "next/server"
import { loadEnvConfig } from '@next/env'

export async function GET(request: NextRequest) {
  // Load environment variables from the current directory
  loadEnvConfig(process.cwd());

  const code = await request.nextUrl.searchParams.get("code") || null
  const NEXT_PUBLIC_SPOTIFY_CLIENT_ID =  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
  const SPOTIFY_CLIENT_SECRET =  process.env.SPOTIFY_CLIENT_SECRET as string;
  const NEXT_PUBLIC_NEXTAUTH_URL =  process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;

  if(code === null){
    return NextResponse.redirect(`${NEXT_PUBLIC_NEXTAUTH_URL}/auth/error?error=${encodeURIComponent('No code provided')}`);
  }else{
    const fetchToken = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "authorization": "Basic " + Buffer.from(`${NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri:`${NEXT_PUBLIC_NEXTAUTH_URL}/api/auth`
    })
  });

    if(!fetchToken.ok){
      const errorData = await fetchToken.json();
      return NextResponse.redirect(`${NEXT_PUBLIC_NEXTAUTH_URL}/auth/error?error=${encodeURIComponent(JSON.stringify(errorData))}`);
    }

    const tokenData = await fetchToken.json();
    // Set token in cookie
    const response = NextResponse.redirect(`${NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`);
    response.cookies.set("spotify_token", tokenData.access_token, { httpOnly: true, secure: true, path: '/' });
    return response;
  }
}