"use client";

import React, { useEffect, useState } from 'react';
import CustomizedAccordions from './../../widgets/accordion/accordion';
import Navbar from '@/app/widgets/navbar/navbar';
import { useSelector } from 'react-redux';
import { usePlaylists } from "@/libs/hooks/usePlaylistsHook";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [video, setVideo] = useState<string>('');
  const videoPlayer = useSelector((state: any) => state.store.videoPlayer);
  usePlaylists();

  const src = `https://www.youtube.com/embed/${video}?rel=0`;
  const title = "YouTube video player";

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsPlaylistid = params.playlistId;
  const sections = useSelector((state: any) => state.store.playlists[paramsPlaylistid]?.sections)

  useEffect(() => {
    setVideo(videoPlayer);
  }, [videoPlayer]);

  useEffect(() => {
    if (sections && typeof sections === 'object' && Object.keys(sections).length > 0) {
      for (const sectionKey of Object.keys(sections)) {
        const videos = sections[sectionKey];

        if (videos && typeof videos === 'object' && Object.keys(videos).length > 0) {
          for (const videoKey of Object.keys(videos)) {
            const video = videos[videoKey];
            if (video.done === 0) {
              setVideo(video.link);
              return;
            }
          }
        }
      }
    }
  }, []);
  

  return (
    <>
      <Navbar />
      <div className='h-screen bg-green-500 flex'>
        <section className='h-screen w-4/5' style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
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
        <section className='h-screen w-1/3 bg-black'>
          <CustomizedAccordions />
        </section>
      </div>
    </>
  );
}
