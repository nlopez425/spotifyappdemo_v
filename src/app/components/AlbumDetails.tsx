"use client"
import { use, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../dashboard/dashboardContext";

export default function AlbumDetails() {
    const {albumId} = useContext(DashboardContext);
    const [albumTrackDetails, setAlbumTrackDetails] = useState<any>(null);
  
    
    useEffect(() => {
        const fetchAlbumDetails = async () => {
            if (albumId !== "") {
                const res = await fetch("/api/spotify/artist/albums/tracks", {
                    method: "POST",
                    body: JSON.stringify({ albumId }),
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                setAlbumTrackDetails(data);
            }else {
                setAlbumTrackDetails(null);
            }
        };
        fetchAlbumDetails();
    }, [albumId]);
   
    

    return(
        <section className="album-details grid gap-4 p-4 border rounded-sm bg-white/5">
            <h2 className="text-5xl font-bold">Tracks</h2>
            {albumTrackDetails ? 
                <div>
                    <h3 className="text-2xl font-bold text-lime-400">{albumTrackDetails.name}</h3>
                <ol className="list-decimal list-inside">
                    {albumTrackDetails.tracks.items.map((track:any, index:number) => (
                        <li key={index}>{track.name}</li>
                    ))}
                </ol>
                
            </div>: <p>Select an album to see details</p>      
        }
        </section>
    )
}