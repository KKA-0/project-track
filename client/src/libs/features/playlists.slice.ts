'use client'

import { createSlice, current } from "@reduxjs/toolkit"
import { createPlaylist } from "./playlists.api"
import ls, {get,set} from "local-storage";

export interface PlaylistSlice {
    playlists: any,   
    videoPlayer: string
}

const initialState: PlaylistSlice = {
    playlists: {},
    videoPlayer: ""
}

interface Video {
    link: string;
    duration: string;
    durationRaw: number;
    done: number;
}

interface Section {
    [videoTitle: string]: Video;
}

interface Playlist {
    title: string;
    info: string;
    completed: number;
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
    sections: {
        [sectionTitle: string]: Section;
    };
}

interface Playlists {
    [playlistId: string]: Playlist;
}

function calculateProgress(playlists: Playlists, playlistId: string) {
    console.log(playlists, playlistId);
    
    if (!playlists || typeof playlists !== 'object') {
        throw new TypeError('The playlists parameter must be a non-null object');
    }

    const playlist = playlists[playlistId];
    if (!playlist || typeof playlist.sections !== 'object') {
        throw new TypeError(`Playlist with ID ${playlistId} is not valid or sections are missing`);
    }

    let completedVideos = 0;
    let totalVideos = 0;

    for (const section in playlist.sections) {
        if (playlist.sections.hasOwnProperty(section)) {
            const videos = playlist.sections[section];
            if (typeof videos !== 'object') {
                continue;
            }
            for (const video in videos) {
                if (videos.hasOwnProperty(video)) {
                    const videoData = videos[video];
                    if (videoData.done === 1) {
                        completedVideos += 1;
                    }
                    totalVideos += 1;
                }
            }
        }
    }

    const progress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
    console.log(progress)
    return progress
}


export const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        getPlaylist: (state, action) => {
            state.playlists = action.payload
        },
        addPlaylist: (state, action) => {

        },
        removePlaylist: (state, action) => {

        },
        editPlaylist: (state, action) => {

        },
        currentVideo: (state, action) => {
            state.videoPlayer = action.payload
        },
        videoStatus: (state, action) => {
            const { videoTitle, checked, playlistId, section }  = action.payload
            // console.log(videoTitle, checked, playlistId, section)
            state.playlists[playlistId].sections[section][videoTitle].done = (checked) ? 1 : 0
            // Update Progress Bar
            state.playlists[playlistId].completed = calculateProgress(current(state.playlists), playlistId)
            
            set('playlists', current(state.playlists));
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPlaylist.fulfilled, (state, action) => {
                interface Playlist {
                    [key: string]: any; // Allows dynamic keys
                    playlistId: string;
                  }
                const playlistId = action.payload.playlistId;
                if(!playlistId){
                    return;
                }
                const playlistData = get('playlists') as Playlist || {};
                playlistData[playlistId] = action.payload;
                set('playlists', playlistData);
                state.playlists = playlistData
            })
    }
}) 


export const { getPlaylist, addPlaylist, removePlaylist, editPlaylist, currentVideo, videoStatus } = playlistSlice.actions;
export default playlistSlice.reducer