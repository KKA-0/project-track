"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../widgets/navbar/navbar'
import Cards from "../widgets/cards/cards"
import FormDialog from '../widgets/FormDialog/FormDialog'
import { Suspense } from 'react';
import { useFetch } from '@/utils/api/apiService';
import { usePlaylists } from "@/libs/hooks/usePlaylistsHook"
import { getPlaylist } from "@/libs/features/playlists.slice"
import { useAppDispatch } from "@/libs/hooks/hooks";
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';

interface Playlist {
  playlistid: string;
  title: string;
  imageuri: string;
  info: string;
  completed: number;
  channelname: string;
  totalduration: {
    formatted: string;
  };
  totalvideos: number;
}

interface PlaylistsMap {
  [key: string]: Playlist;
}

export default function Playlists(): React.ReactElement {
  const dispatch = useAppDispatch();
  const StatePlaylists = useSelector((state: any) => state.store.playlists)
  const [isUser, setIsUser] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<PlaylistsMap>({});
  
  // Always call hooks at the top level, regardless of conditions
  const getPlaylists = useFetch<Playlist[]>('playlists', `/playlists/list`);
  const userPlaylists = usePlaylists();
  
  // Check user authentication status
  useEffect(() => {
    const token = Cookies.get('access_token');
    if(token) {
      setIsUser(true);
    }
    if (token) {
      // For authenticated users, use the fetched playlists
      if (getPlaylists.data) {
        setPlaylists({}); // Reset to avoid duplications
        
        const playlistsMap: PlaylistsMap = {};
        if (Array.isArray(getPlaylists.data)) {
          getPlaylists.data.forEach((item: Playlist) => {
            playlistsMap[item.playlistid] = item;
          });
        }
        
        setPlaylists(playlistsMap);
        console.log(playlistsMap);
        dispatch(getPlaylist(playlistsMap));
      }
      
      if (getPlaylists.error) {
        console.error(getPlaylists.error);
      }
    } else {
      // For unauthenticated users, use the playlists from the hook
      setPlaylists(userPlaylists);
    }
  }, [getPlaylists.data, getPlaylists.error]);
  
 
  return (
    <>
      <Navbar />
      <div className='w-full h-20 bg-slate-800 flex items-center justify-center'>
        <FormDialog />
      </div>
      <div className="flex flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
          {
            Object.keys(StatePlaylists).length > 0 ?
              Object.keys(StatePlaylists).map((key: string) => (
                <Cards
                  key={key}
                  title={StatePlaylists[key].title}
                  info={StatePlaylists[key].info}
                  completed={Number(StatePlaylists[key].completed)}
                  playlistId={StatePlaylists[key].playlistid}
                  channelName={StatePlaylists[key].channelname}
                  duration={StatePlaylists[key].totalduration?.formatted || "0:00"}
                  totalVideos={Number(StatePlaylists[key].totalvideos)}
                />
              ))
            : <div className="w-full p-4 text-center">No playlists found</div>
          }
        </Suspense>
      </div>
    </>
  )
}