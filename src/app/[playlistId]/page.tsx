"use client"
import Container from "@/components/Container";
import Search from "@/components/Search";
import { useFetchPlaylist } from "@/hooks/useFetchPlaylist"
import { useSearchVideos } from "@/hooks/useSearchVideos";
import { useAddVideoToPlaylist } from "@/hooks/useAddVideoToPlaylist";
import { useRemoveVideoFromPlaylist } from "@/hooks/useRemoveVideoFromPlaylist";
import { format } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { Playlist, Video } from "@/types";
import YouTube from 'react-youtube';
import { useMyPlaylists } from "@/hooks/useMyPlaylists";


export default function Playlist({ params }: { params: { playlistId: string } }) {

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState<Video>();
    const [playlist, setPlaylist] = useState<Playlist>();
    const [error, setError] = useState<string>();
    console.log(playlist?.name)

    const { data: fetchPlaylist, isLoading } = useFetchPlaylist(params.playlistId);
    const { data: searchVideos, isLoading: isSearching, searchQuery, setSearchQuery } = useSearchVideos();
    const { mutate: addVideoToPlaylist } = useAddVideoToPlaylist(params.playlistId);
    const { mutate: removeVideoFromPlaylist } = useRemoveVideoFromPlaylist(params.playlistId);

    const { playlists, addPlaylist, removePlaylist } = useMyPlaylists();

    useEffect(() => {
        if (fetchPlaylist) {
            setPlaylist(fetchPlaylist);
        }
    }, [fetchPlaylist]);

    useEffect(() => {
        if (playlist && playlist.videos.length > 0 && activeVideoIndex < playlist.videos.length) {
            setActiveVideo(playlist.videos[activeVideoIndex]);
        }
    }, [playlist, activeVideoIndex]);

    const onVideoEnd = () => {
        const nextVideoIndex = activeVideoIndex + 1;
        if (playlist && nextVideoIndex < playlist.videos.length) {
            setActiveVideoIndex(nextVideoIndex);
        }
    };

    const videoOptions = {
        width: '100%',
        height: '400px',
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        if (!error && playlist?.message) {
            setError(playlist.message);
        }

    }, [playlist, error]);

    if (error) {
        return (
            <Container>
                <div>{error}</div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="flex min-h-[var(--full)] max-md:flex-wrap">
                <section className="w-full">
                    {(isLoading || !playlist) ? <div>Loading...</div> : <div>
                        {activeVideo && (
                            <div className="flex flex-col gap-4 mb-4  pr-5 max-md:pr-0">
                                <div className="overflow-hidden rounded-[12px]">
                                    <YouTube
                                        videoId={activeVideo.id.videoId}
                                        opts={videoOptions}
                                        onEnd={onVideoEnd}
                                    />
                                </div>

                                <div>
                                    <p className="text-[16px] font-bold">{activeVideo.snippet.title}</p>
                                    <p className="text-n500">{format(activeVideo.views, 3)} views</p>
                                </div>

                            </div>
                        )}
                        <div className="pr-5 max-md:pr-0">
                            <div className="bg-secondary py-8 rounded-[12px] mb-5">
                                <div className="flex justify-between items-center px-8  mb-8">
                                    <h1 className="text-[16px] font-bold ">{playlist?.name} - Upcoming Videos</h1>
                                    <div className="flex gap-8">
                                        {
                                            playlists.some((p) => p.id === params.playlistId) ? <button className="text-red-500 w-fit"
                                                onClick={() => {
                                                    removePlaylist(params.playlistId);
                                                }}
                                            >Remove Playlist</button> :
                                                <button className="text-green-500 w-fit"
                                                    onClick={() => {
                                                        addPlaylist(params.playlistId, playlist!.name);
                                                    }}
                                                >Save Playlist</button>
                                        }
                                        <button className="text-blue-500 w-fit"
                                            onClick={
                                                () => {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    alert('Link copied to clipboard');
                                                }
                                            }
                                        >Share</button>

                                    </div>
                                </div>


                                <div className="flex flex-col ">
                                    {
                                        playlist?.videos.length === 0 && <div className="px-8 text-n500">No videos in this playlist yet</div>
                                    }
                                    {playlist?.videos.map((video, n) => (
                                        <div key={n} className={`flex gap-3 max-w-full px-8 cursor-pointer hover:bg-slate-200 active:bg-slate-300 transition-[0.2s] py-4 ${activeVideoIndex === n ? 'bg-blue-100 hover:bg-blue-100' : ''}`}
                                            onClick={() => {
                                                setActiveVideoIndex(n); setActiveVideo(video);
                                                window.scrollTo(0, 0);
                                            }}
                                        >
                                            <Image src={video.snippet.thumbnails.url} width={video.snippet.thumbnails.width} height={video.snippet.thumbnails.height} className="w-[150px] min-w-[150px] h-[80px] min-h-[80px] object-cover rounded-[4px]" alt="" />
                                            <div className="max-w-full flex flex-col gap-[2px]">
                                                <p className="trunc font-bold text-[13px]">{video.snippet.title}</p>
                                                <p className="text-n500">{video.channelName}</p>
                                                <p className="text-n500">{format(video.views, 3)} views</p>
                                                <button className="text-red-500 w-fit"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeVideoFromPlaylist(video.id.videoId);
                                                        setPlaylist((prev) => {
                                                            if (prev) {
                                                                return {
                                                                    ...prev,
                                                                    videos: prev.videos.filter((v) => v.id.videoId !== video.id.videoId)
                                                                }
                                                            }
                                                        })
                                                    }}
                                                >Remove</button>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                    }
                </section>
                <section className="w-full max-w-[400px] max-md:max-w-full pb-5 pl-5 max-md:pl-0">
                    <div className="mb-5">
                        <Search search={searchQuery} setSearch={setSearchQuery} />
                    </div>

                    {isSearching ? <div>Searching...</div> : <div className="overflow-y-auto flex flex-col gap-8">

                        {searchVideos?.map((video, n) => (
                            <div key={n} className="flex gap-3 max-w-full cursor-pointer"
                                onClick={() => {
                                    if (playlist?.videos.some((v) => v.id.videoId === video.id.videoId)) {
                                        return;
                                    }
                                    addVideoToPlaylist(video);
                                    setPlaylist((prev) => {
                                        if (prev) {
                                            return {
                                                ...prev,
                                                videos: [...prev.videos, video]
                                            }
                                        }
                                    })
                                }}
                            >
                                <Image src={video.snippet.thumbnails.url} width={video.snippet.thumbnails.width} height={video.snippet.thumbnails.height} className="w-[150px] min-w-[150px] h-[80px] min-h-[80px] object-cover rounded-[4px]" alt="" />
                                <div className="max-w-full flex flex-col gap-[2px]">
                                    <p className="trunc font-bold text-[13px]">{video.snippet.title}</p>
                                    <p className="text-n500">{video.channelName}</p>
                                    <p className="text-n500">{format(video.views, 3)} views</p>
                                </div>

                            </div>
                        ))}

                    </div>}
                </section>

            </div>

        </Container>


    )
}
