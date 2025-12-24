import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  "/dashboard", 
];

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("spotify_token");

  // Skip middleware for API routes
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (protectedPaths.includes(url.pathname) && !token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
  }else{
    return NextResponse.next();
  }
}