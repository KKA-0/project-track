"use client"

import React from 'react'
import Navbar from '../widgets/navbar/navbar'
import Cards from "../widgets/cards/cards"
import FormDialog from '../widgets/FormDialog/FormDialog'
import { Suspense } from 'react';
import { usePlaylists } from "@/libs/hooks/usePlaylistsHook"

export default function Playlists() {
  const playlists = usePlaylists();

  return (
    <>
      <Navbar />
      <div className='w-full h-20 bg-slate-800 flex items-center justify-center'>
        <FormDialog />
      </div>
      <div className="flex flex-wrap">
      <Suspense fallback={<div>Loading...</div>}>
        {
          Object.keys(playlists).length > 0 ? 
            Object.keys(playlists).map(key => (
              <Cards 
                key={key} 
                title={playlists[key].title} 
                imageUri={playlists[key].imageUri} 
                info={playlists[key].info} 
                completed={playlists[key].completed} 
                playlistId={playlists[key].playlistId} 
                channelName={playlists[key].channelName}
              />
            ))
          : null
        }
        </Suspense>
      </div>
    </>
  )
}
