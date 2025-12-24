'use client';

import { useEffect, useState } from "react";
import AlbumSelector from "../components/AlbumSelector";
import type { Artist, TopArtistResponse, AlbumResponse } from "../types/types";
import AlbumDetails from "../components/AlbumDetails";
import { DashboardContext } from "./dashboardContext";
import ArtistSelectionList from "../components/ArtistSelectionList";



export default function Dashboard() {
  const [albumId, setAlbumId] = useState<string>("");
  const [data, setData] = useState<TopArtistResponse | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<AlbumResponse | null>(null);
  const [artistDetails, setArtistDetails] = useState<{} | {id:string, href:string}>({});

  useEffect(() => {
    const getTopArtist = async () => {
      const res = await fetch("/api/spotify/user/top-artist", {
        method: "POST",
        cache: "no-store"
      });
      const result = await res.json();
      setData(result);
    };
    getTopArtist();
  }, []);

  useEffect(() => {
    const loadInitialArtists = async () => {
      if (data && data.items && data.items[0]) {
        const artist = data.items[0];
        const artistData = await fetch("/api/spotify/artist", {
          method: "POST",
          body: JSON.stringify({ href: artist.href }),
          headers: { "Content-Type": "application/json" }
        });
        const artistResult = await artistData.json();
        setArtist(artistResult);
        setArtistDetails({
          id: artistResult.id,
          href: artistResult.href
        });
      }
    };
    loadInitialArtists();
  }, [data]);

  useEffect(() => {
    const loadAlbums = async () => {
      if (artistDetails && 'id' in artistDetails) {
        const albumsData = await fetch("/api/spotify/artist/albums", {
          method: "POST",
          body: JSON.stringify({ id: artistDetails.id }),
          headers: { "Content-Type": "application/json" }
        });
        const albumsResult = await albumsData.json();
        setAlbums(albumsResult);
      }
    };
    const updateArtistInfo = async () => {
      if (artistDetails && 'id' in artistDetails) {
        const artistData = await fetch("/api/spotify/artist", {
          method: "POST",
          body: JSON.stringify({ href: artistDetails.href }),
          headers: { "Content-Type": "application/json" }
        });
        const artistResult = await artistData.json();
        setArtist(artistResult);
      }
    };
    updateArtistInfo();
    loadAlbums();
  }, [artistDetails]);

  return (
    <DashboardContext.Provider value={{albumId, setAlbumId, artistDetails, setArtistDetails}}>
    <main className="font-sans h-screen">
    <header className="border-b-2 border-stone-800 sticky top-0 bg-black z-10">
        <h1 className={`text-4xl font-bold p-4 ${data ? '':'animate-pulse'}`}>{data ? `Your Top ${data?.items.length} Spotify` : "Loading..."} Artists</h1>
    </header>
    <div id="artis-list-wrapper" className="h-screen grid grid-cols-12 gap-4">
        <ArtistSelectionList artists={data?.items}/>
        <section className="h-screen overflow-y-auto col-span-9 p-4">
                {data ? <div>
                <header className="grid grid-cols-12 gap-4">    
                    <h1 className="text-7xl font-bold text-lime-400 col-span-8">{artist?.name}</h1>
                    <div id="fan-count" className="text-[2vw] col-span-4 font-bold text-amber-400 relative">
                        <p className="text-right absolute bottom-0 right-0">{artist?.followers.total.toLocaleString()} Follows</p>
                    </div>
                </header>
                <section className="grid grid-cols-12 gap-4">
                    <div id="genres" className="col-span-12">{artist?.genres.join(" , ")}</div>
        
                    <div id="popularity" className="col-span-6">
                        <h2 className="text-3xl font-bold">Popularity Score</h2>
                        <p className="text-[20vw] font-bold text-pink-500 leading-none">{artist?.popularity}</p>
                    </div>
                     <AlbumSelector albums={albums?.items}/>  
                </section>
                 <section className="h-screen overflow-y-auto col-span-12 p-4">
                    <AlbumDetails/>
                </section>
                </div> : <p className="animate-pulse">Loading...</p>} 
        </section>
    </div>
  </main>
  </DashboardContext.Provider>
  );
}