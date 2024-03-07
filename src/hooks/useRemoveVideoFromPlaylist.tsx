import { useMutation } from '@tanstack/react-query';
import { apiURL } from '@/contants';
import type { Playlist } from '@/types';

export const useRemoveVideoFromPlaylist = (id: string) => {
    return useMutation({
        mutationKey: ['addVideoToPlaylist', id],
        mutationFn: (videoId: string) => {
            return fetch(`${apiURL}/playlists/${id}/videos/${videoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => res.json() as Promise<Playlist>);
        },
    });
}
