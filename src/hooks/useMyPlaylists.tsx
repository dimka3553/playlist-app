import { useState, useEffect } from "react";

type Playlist = {
    id: string;
    name: string;
};

export const useMyPlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedPlaylists = localStorage.getItem("playlists");
        if (storedPlaylists) {
            setPlaylists(JSON.parse(storedPlaylists));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (playlists.length === 0) {
            return;
        }
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [playlists]);

    const addPlaylist = (playlistId: string, playlistName: string) => {
        setPlaylists(prevPlaylists => [...prevPlaylists, { id: playlistId, name: playlistName }]);
    };

    const removePlaylist = (playlistId: string) => {
        setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.id !== playlistId));
    };

    return { playlists, addPlaylist, removePlaylist, isLoading };
};
