"use client";
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist"
import { useMyPlaylists } from "@/hooks/useMyPlaylists";
import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const [playlistName, setPlaylistName] = useState("");

  const { playlists } = useMyPlaylists();

  const { mutate, data } = useCreatePlaylist(playlistName);

  return (
    <main className="min-h-[var(--full)] flex items-center justify-center">
      <div className="w-full max-w-[350px]">
        <h1 className="font-bold text-[16px]">My Playlists</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="border border-n200 rounded-[4px] h-[32px] w-full mt-[10px] mb-[10px] p-[10px]"
            placeholder="Playlist Name"
          />
          <button
            className="btn w-[160px]"
            onClick={() => {
              mutate();
            }}
          >Create Playlist</button>
        </div>

        <div className="flex flex-wrap gap-3">
          {playlists?.map((playlist) => (
            <div key={playlist.id}><Link href={`/${playlist.id}`}><div className="bg-secondary px-4 py-2 rounded-[4px] transition-[0.2s] hover:bg-slate-200 active:bg-slate-300" >{playlist.name}</div></Link></div>
          ))}
        </div>


      </div>

    </main>
  );
}
