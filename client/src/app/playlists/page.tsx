"use client"

import React from 'react'
import Navbar from '../widgets/navbar/navbar'
import Cards from "../widgets/cards/cards"
import FormDialog from '../widgets/FormDialog/FormDialog'
import ls, {get,set} from "local-storage";
import { useEffect, useState } from 'react';

interface Playlist {
  title: string,
  imageUri: string,
  info: string,
  progress: number
}

export default function playlists() {

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const playlistData = get<Playlist[]>('playlists');
      setPlaylists(playlistData)
    }
    fetchData()
  }, [])
  


  return (
    <>
        <Navbar/>
        <div className='w-full h-20 bg-slate-800 flex items-center justify-center'>
          <FormDialog />
        </div>
        <div className="flex flex-wrap" >
          {
            (playlists) ? 
            playlists.map((item, key) => <Cards key={key} title={item.title} imageUri={item.imageUri} info={item.info} progress={item.progress}/>)
            : null
          }
        </div>
    </>
  )
}
