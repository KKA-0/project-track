"use client";
import React, { Suspense, useEffect, useState } from 'react';
import CustomizedAccordions from './../../widgets/accordion/accordion';
import VideoCard from './../../widgets/videoCard/videoCard'; // Consider using this if needed
import Navbar from '@/app/widgets/navbar/navbar';
import { useSelector } from 'react-redux';
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [video, setVideo] = useState<string>(''); // Assuming a single video link
  const videoPlayer = useSelector((state: any) => state.store.videoPlayer);

  const src = `https://www.youtube.com/embed/${video}?rel=0`;
  const title = "YouTube video player";

  useEffect(() => {
    setVideo(videoPlayer);
  }, [videoPlayer]);

  // useEffect(() => {
  //   console.log("trying to find playlist requested...")
  //   const playlistId = params?.playlistId;
  //   if (playlistId) {
  //     const matchedPlaylist = StatePlaylists.find(
  //       (item: { playlistId: string; sections: any[] }) => item.playlistId === playlistId
  //     );
  //     if (matchedPlaylist && matchedPlaylist.sections.length > 0 && matchedPlaylist.sections[0].videos.length > 0) {
  //       setVideo(matchedPlaylist.sections[0].videos[0].link);
  //     }
  //   }
  // }, [params?.playlistId, StatePlaylists]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <div className='h-screen bg-green-500 flex'>
          <section className='h-screen w-4/5 bg-blue-500'>
            <iframe
              className='w-full h-4/5'
              src={src}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </section>
          <section className='h-screen w-1/3 bg-black'> {/* Fixed class name */}
            <CustomizedAccordions />
          </section>
        </div>
      </Suspense>
    </>
  );
}
