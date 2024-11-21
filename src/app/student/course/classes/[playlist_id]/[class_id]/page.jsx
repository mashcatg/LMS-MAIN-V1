"use client";

import React, { useEffect, useState } from "react";

const ClassDetailPage = ({ params }) => {
  const { playlist_id, class_id } = params;
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const iframeRef = React.useRef(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(
          `https://youthsthought.com/lms-backend/student-panel/classes/fetch_class_details.php?playlist_id=${playlist_id}&class_id=${class_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.class) {
          setClassDetails(data.class);
        } else {
          setError("Class not found");
        }
      } catch (error) {
        setError("Failed to fetch class details");
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [playlist_id, class_id]);

  const embedYouTubeLink = (url) => {
    const videoId = url.split("v=")[1] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  };

  const handlePlayPause = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const command = isPlaying ? "pauseVideo" : "playVideo";
      iframe.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, "*");
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteUnmute = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const command = isMuted ? "unMute" : "mute";
      iframe.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, "*");
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (seconds) => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${currentTime + seconds}, true]}`, "*");
    }
  };

  const handleTimeUpdate = () => {
    // Assuming there’s a way to update currentTime and duration
    // For now, placeholders for demonstration
    setCurrentTime(30); // Placeholder for current time in seconds
    setDuration(180); // Placeholder for video duration in seconds
  };

  useEffect(() => {
    window.addEventListener("message", handleTimeUpdate);
    return () => window.removeEventListener("message", handleTimeUpdate);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {classDetails ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          {/* Video Player Section */}
          <div className="relative mb-6">
            <div className="relative overflow-hidden rounded-lg w-full">
              <iframe
                ref={iframeRef}
                className="w-full h-[400px] md:h-[500px] rounded-lg pointer-events-none"
                src={embedYouTubeLink(classDetails.class_link)}
                title={classDetails.class_name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
            </div>

            {/* Custom Video Controls */}
            <div className="flex items-center justify-between bg-gray-800 bg-opacity-90 p-4 rounded-b-lg w-full absolute bottom-0">
              {/* Play/Pause Button */}
              <button onClick={handlePlayPause} className="text-[#30d1a0] text-3xl hover:text-white transition">
                {isPlaying ? "⏸" : "▶️"}
              </button>

              {/* 10s Backward */}
              <button onClick={() => handleSeek(-10)} className="text-[#30d1a0] text-2xl hover:text-white transition">
                ⏪ 10s
              </button>

              {/* Current Time and Duration */}
              <div className="text-gray-200 text-lg">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* 10s Forward */}
              <button onClick={() => handleSeek(10)} className="text-[#30d1a0] text-2xl hover:text-white transition">
                10s ⏩
              </button>

              {/* Mute/Unmute Button */}
              <button onClick={handleMuteUnmute} className="text-[#30d1a0] text-3xl hover:text-white transition">
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Notes</h3>
            {classDetails.notes && classDetails.notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classDetails.notes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <h4 className="text-lg font-bold text-gray-700">{note.note_name}</h4>
                    <p className="text-sm text-gray-500">Tags: {note.note_tags}</p>
                    <a
                      href={note.file_address}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-4 py-2 bg-[#30d1a0] text-white rounded-md text-sm font-medium hover:bg-[#27b98e] transition"
                    >
                      Download Note
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No notes available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Loading class details...</p>
      )}
    </div>
  );
};

export default ClassDetailPage;
