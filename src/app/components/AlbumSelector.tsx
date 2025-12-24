"use client"

import React, {useContext} from "react"
import type {Album} from "../types/types";
import AlbumDetails from "./AlbumDetails";
import { DashboardContext } from "../dashboard/dashboardContext";

interface AlbumSelectorProps {
  albums: Album[] | undefined;
}

export default function AlbumSelector({ albums }: AlbumSelectorProps) {
  
  const {setAlbumId} = useContext(DashboardContext);
  
  const handleAlbumClick = (albumId: string) => {
    setAlbumId(albumId);
  };

  return (
    <div id="image-wrapper" className={`col-span-6  ${albums ? '':'animate-pulse'}`}>
        <h2 className="text-3xl font-bold">Albums</h2>
        <ul className="flex overflow-x-auto space-x-4">
        {albums ? albums.map((album,index) => (
            <li onClick={()=>handleAlbumClick(album.id)} key={index} className="p-3 border-6 border-stone-800 flex-none w-1/2 cursor-pointer hover:border-pink-500">
                <img src={album.images[0].url} alt={album.name} width="100%" />
            </li>
        )) : <p>No Albums available</p>}
        </ul>
    </div>
)
}