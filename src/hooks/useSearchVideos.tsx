import { useQuery } from '@tanstack/react-query'
import { apiURL } from '@/contants';
import type { Video } from '@/types';
import { useState } from 'react';

export const useSearchVideos = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return {
        ...useQuery({
            queryKey: ['searchResults', searchQuery],
            queryFn: () => fetch(`${apiURL}/search?q=${searchQuery}`).then((res) => res.json() as Promise<Video[]>),
            enabled: searchQuery.length > 0
        }), setSearchQuery, searchQuery
    };
};
