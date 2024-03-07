import { useMutation } from '@tanstack/react-query';
import { apiURL } from '@/contants';
import { useMyPlaylists } from './useMyPlaylists';
import { useRouter } from 'next/navigation';
import Confetti from '@/components/Confetti';

export const useCreatePlaylist = (name: string) => {

    const router = useRouter();
    const { addPlaylist } = useMyPlaylists();

    return useMutation({
        mutationKey: ['createPlaylist', name],
        mutationFn: async () => {
            return fetch(`${apiURL}/playlists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                }),
            }).then((res) => res.json() as Promise<{ id: string }>).then((data) => {
                addPlaylist(data.id, name);
                router.push(`/${data.id}`);
                Confetti();
                return data;
            });
        },
    });
}
