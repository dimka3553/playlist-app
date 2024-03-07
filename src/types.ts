export type Video = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: {
            id: string;
            url: string;
            height: number;
            width: number;
        };
    };
    duration: string;
    views: string;
    channelName: string;
    url: string;
};

export type Playlist = {
    message?: string;
    name: string;
    videos: Video[];
};