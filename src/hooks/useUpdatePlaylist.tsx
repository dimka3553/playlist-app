import { useMutation } from '@tanstack/react-query';
import { apiURL } from '@/contants';
import type { Playlist } from '@/types';

export const useUpdatePlaylist = ({ id, playlist }: { id: string, playlist: Playlist }) => {
    return useMutation({
        mutationKey: ['editPlaylist', playlist],
        mutationFn: () => {
            return fetch(`${apiURL}/playlists/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlist),
            }).then((res) => res.json());
        },
    });
}
