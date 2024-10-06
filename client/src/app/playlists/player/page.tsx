
"use client"
import React from 'react'
import CustomizedAccordions from "./../../widgets/accordion/accordion"
import VideoCard from "./../../widgets/videoCard/videoCard"
import Navbar from '@/app/widgets/navbar/navbar'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";

export default function page() {

  const [Video, setVideo] = useState<any[]>([])
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  // console.log(params.playlistId)

  const src = `https://www.youtube.com/embed/${Video}?rel=0`
  const title = "ouTube video player"

  const StatePlaylists = useSelector((state: any) => state.store.playlists)
  const videoPlayer = useSelector((state: any) => state.store.videoPlayer)

  useEffect(() => {
    setVideo(videoPlayer)
  }, [videoPlayer])
  

  // useEffect(() => {
  //   const playlistId = params?.playlistId;
  //   if (playlistId) {
  //     const matchedPlaylist = StatePlaylists.find(
  //       (item: { playlistId: string; sections: any[] }) => item.playlistId === playlistId
  //     );
  //     if (matchedPlaylist) {
  //       setVideo(matchedPlaylist.sections[0].videos[0].link);
  //       console.log(Video)
  //     }
  //   }
  // }, [params?.playlistId, StatePlaylists]);

  return (
    <>
      <Navbar/>
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
        <section className='h-screen w-1/3 bg-black-500'>
          <CustomizedAccordions/>
        </section>
      </div>
    </>
  )
}
