import { useContext } from "react";
import { DashboardContext } from "../dashboard/dashboardContext";

export default function ArtistSelectionList({artists}: {artists: any}) {
    const {albumId, setAlbumId, setArtistDetails} = useContext(DashboardContext);
    
    const handleSelection = (id:string, href:string) => {
        setAlbumId("");
        setArtistDetails({id, href});
    }
    
    return (
        <section className="h-screen overflow-y-auto col-span-3">
            <ul className="p-4">
                {artists ? artists.map((artist: any) => (
                <li key={artist.id} className="mb-6" onClick={() => handleSelection(artist.id, artist.href)}>
                    <img src={artist.images?.[0]?.url} alt={artist.name} width="100%" className="animate-fade-in grayscale-50 transition duration-300 ease-in-out hover:grayscale-0 cursor-pointer"/> 
                    <p>{artist.name}</p>
                </li>
                )) : <li className="animate-pulse">Loading...</li>}
            </ul>
        </section>
    )
}