import { useMutation } from '@tanstack/react-query';
import { apiURL } from '@/contants';
import type { Video, Playlist } from '@/types';

export const useAddVideoToPlaylist = (id: string) => {
    return useMutation({
        mutationKey: ['addVideoToPlaylist', id],
        mutationFn: (video: Video) => {
            return fetch(`${apiURL}/playlists/${id}/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(video),
            }).then((res) => res.json() as Promise<Playlist>);
        },
    });
}
