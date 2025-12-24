export type Artist = { 
    id: string; name: string, 
    genres: string[],
    href: string, 
    images: { url: string }[], 
    popularity: number,
    followers: { total: number }  
};
export type Album = { 
    id: string; name: string, 
    images: { url: string }[], 
};
export type TopArtistResponse = { items: Artist[] };
export type AlbumResponse = { items: Album[] };

export type  DashboardContextType = {
  albumId: string;
  setAlbumId: React.Dispatch<React.SetStateAction<string>>;
  artistDetails: {} | { id: string; href: string; };
  setArtistDetails: React.Dispatch<React.SetStateAction<{} | { id: string; href: string;}>>;
}