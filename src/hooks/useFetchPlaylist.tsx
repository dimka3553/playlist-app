import { useQuery } from '@tanstack/react-query'
import { apiURL } from '@/contants';
import type { Playlist } from '@/types';

export const useFetchPlaylist = (playlistId: string) => {
    return useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: () => fetch(`${apiURL}/playlists/${playlistId}`).then((res) => res.json() as Promise<Playlist>),
        refetchInterval: 1000,
    });
}

