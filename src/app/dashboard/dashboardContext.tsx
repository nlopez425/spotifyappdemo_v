import { createContext } from "react";
import { DashboardContextType } from "../types/types";

export const  DashboardContext = createContext<DashboardContextType>({
    albumId: "",
    setAlbumId: () => {},
    artistDetails: {
        id: "",
        href: "",
    },
    setArtistDetails: () => {},
});