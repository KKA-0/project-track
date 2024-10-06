import { Controller, Body, Post } from '@nestjs/common';
const generateContent = require('./../../gemini/gemini.playlist.js');
import axios from 'axios'

function formatData(data) {
    return data.map(({ snippet: { title, resourceId: { videoId } } }) => ({
        title,
        uri: videoId
    }));
}

@Controller('playlists')
export class PlaylistsController {
    @Post()
    async getPlaylist(@Body() input: any) {
        console.log(input)
        const { playlistId } = input;
        if (!playlistId) {
            return { error: "Playlist ID is required." };
        }
        try {
            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&key=${process.env.youtube_data_v3_api_Key}&maxResults=50&playlistId=${playlistId}`);
            const playlistData = await formatData(data.items)
            const GenPlaylistData = await generateContent(playlistData, playlistId)
            // return playlistData
            return GenPlaylistData
        } catch (err) {
            console.error("Error fetching playlist data:", err);
            return { error: "Failed to fetch playlist data." };
        } 
    }
} 