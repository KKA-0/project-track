"use client"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from "local-storage";
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
    channelName: string;
    totalDuration: {
      formatted: string;
      hours: number;
      minutes: number;
      seconds: number;
      totalSeconds: number;
    };
    totalVideos: number;
    sections: { [sectionName: string]: Section };
  }
  
  type PlaylistsState = { [key: string]: Playlist };

export const usePlaylists = () => {
  const dispatch = useDispatch();
  const StatePlaylists = useSelector((state: any) => state.store.playlists);
  const [playlists, setPlaylists] = useState<PlaylistsState>({});

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = get<PlaylistsState>('playlists');
      if (playlistData) {
        dispatch(getPlaylist(playlistData));
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setPlaylists(StatePlaylists);
  }, [StatePlaylists]);

  return playlists;
};
