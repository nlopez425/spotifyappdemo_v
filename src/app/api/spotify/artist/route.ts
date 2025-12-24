import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest) {
    const cookies = request.cookies;
    const token = await cookies.get("spotify_token");
    const data = await request.json();

    if (!token) {
        return new Response("No token found", { status: 401 });
    }else{
        const fetchArtist = await fetch(data.href,{
            method: "GET",
            headers: { 
                authorization: "Bearer " + token.value
            }
        })
        
        if(!fetchArtist.ok){
            return NextResponse.json({ error: "Failed to fetch artist data" }, { status: 500 });
        }
       
        const artistResult = await fetchArtist.json();
        return NextResponse.json(artistResult);
    }
}