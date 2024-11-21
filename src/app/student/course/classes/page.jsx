"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ClassPlaylists() {
  const [playlistData, SetPlaylists] = useState([]);
  const [error, setError] = useState('');
  
const fetchPlaylists = async () => {
  try {
    const response = await fetch('https://youthsthought.com/lms-backend/student-panel/classes/fetch_playlists.php', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      SetPlaylists(data.playlistData || []);
    }
  } catch (error) {
    console.error('Error fetching playlists:', error);
    setError('Error fetching playlists');
  }
};
// Fetch playlists on component mount
useEffect(() => {
  fetchPlaylists();
}, []);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {playlistData.map((playlist) => (
        <Card key={playlist.playlist_id} className="border rounded-lg overflow-hidden">
          {/* Playlist Banner */}
            <Link href={`/student/course/classes/${playlist.playlist_id}`} className="w-full">

            <div
              className="relative h-60"
              style={{
                backgroundImage: `url(${playlist.playlist_banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              {/* Number of Videos in Top Right */}
              <div className="absolute top-2 right-2 text-sm text-white bg-primary bg-opacity-70 px-2 py-1 rounded">
                {playlist.numberOfVideos}
              </div>

              {/* Playlist Title */}
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{playlist.playlist_name}</h3>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </main>
  );
}
