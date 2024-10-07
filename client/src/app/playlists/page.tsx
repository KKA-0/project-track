"use client"

import React from 'react'
import Navbar from '../widgets/navbar/navbar'
import Cards from "../widgets/cards/cards"
import FormDialog from '../widgets/FormDialog/FormDialog'
import ls, { get, set } from "local-storage";
import { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylist } from '@/libs/features/playlists.slice'

interface Video {
  link: string;
  done: number;
}

interface Section {
  [videoTitle: string]: Video;
}

interface Playlist {
  key: string;
  completed: number;
  title: string;
  imageUri: string;
  info: string;
  playlistId: string;
  sections: { [sectionName: string]: Section };
}

type PlaylistsState = { [key: string]: Playlist };

export default function Playlists() {
  const StatePlaylists: PlaylistsState = useSelector((state: any) => state.store.playlists)
  const [playlists, setPlaylists] = useState<PlaylistsState>({});
  const dispatch = useDispatch()

  // get data from localstorage and set to global state
  useEffect(() => {
    const fetchData = async () => {
      const playlistData = get<PlaylistsState>('playlists');
      if (playlistData) {
        dispatch(getPlaylist(playlistData))
      }
    }
    fetchData()
  }, [dispatch])

  // set global state playlist data to local state 
  useEffect(() => {
    setPlaylists(StatePlaylists)
  }, [StatePlaylists])

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
              />
            ))
          : null
        }
        </Suspense>
      </div>
    </>
  )
}
