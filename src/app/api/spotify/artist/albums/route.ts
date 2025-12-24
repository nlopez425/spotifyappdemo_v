import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest) {
    const cookies = request.cookies;
    const token = await cookies.get("spotify_token");
    const data = await request.json();
    if (!token) {
        return new Response("No token found", { status: 401 });
    }else{
        const fetchAlbums = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums`,{
            method: "GET",
            headers: { 
                authorization: "Bearer " + token.value
            }
        })
        
        if(!fetchAlbums.ok){
            return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
        }
       
        const albumResult = await fetchAlbums.json();
        return NextResponse.json(albumResult);
    }
}