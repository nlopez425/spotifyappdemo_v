
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookie = await cookies();
  const token = cookie.get("spotify_token");
  
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  } else {
    const fetchTopArtists = await fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token.value
      }
    });

    if (!fetchTopArtists.ok) {
      return NextResponse.json({ error: "Failed to fetch top artists" }, { status: 500 });
    }

    const topArtistsData = await fetchTopArtists.json();
    return NextResponse.json(topArtistsData);
  }
}
