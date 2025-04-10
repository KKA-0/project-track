import { Controller, Body, Post } from '@nestjs/common';
const generateContent = require('./../../gemini/gemini.playlist.js');
import axios from 'axios';

// Helper function to convert ISO 8601 duration format to seconds
function parseISO8601Duration(duration) {
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

// Helper function to format seconds to human-readable time
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

function formatPlaylistData(items, videoDurations = {}) {
  return items.map(({ snippet: { title, resourceId: { videoId }, channelTitle } }) => ({
    title,
    uri: videoId,
    channelName: channelTitle,
    duration: videoDurations[videoId] || null,
    durationRaw: videoDurations[videoId + '_raw'] || null
  }));
}

@Controller('playlists')
export class PlaylistsController {
  @Post()
  async getPlaylist(@Body() input: any) {
    console.log(input);
    const { playlistId } = input;
    if (!playlistId) {
      return { error: "Playlist ID is required." };
    }
    
    try {
      // Get playlist items
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&key=${process.env.youtube_data_v3_api_Key}&maxResults=50&playlistId=${playlistId}`
      );
      
      // Extract video IDs for duration lookup
      const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(',');
      
      // Get video durations in a single batch request
      const videosResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=${process.env.youtube_data_v3_api_Key}&id=${videoIds}`
      );
      
      // Process duration information
      const durations = {};
      let totalDurationSeconds = 0;
      
      videosResponse.data.items.forEach(item => {
        const durationISO = item.contentDetails.duration;
        const durationSeconds = parseISO8601Duration(durationISO);
        totalDurationSeconds += durationSeconds;
        
        durations[item.id] = formatDuration(durationSeconds);
        durations[item.id + '_raw'] = durationSeconds;
      });
      
      // Format playlist data with durations
      const playlistData = formatPlaylistData(data.items, durations);
      
      // Calculate total playlist duration
      const totalHours = Math.floor(totalDurationSeconds / 3600);
      const totalMinutes = Math.floor((totalDurationSeconds % 3600) / 60);
      const totalSeconds = totalDurationSeconds % 60;
      
      const totalDuration = {
        formatted: `${totalHours}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
        totalSeconds: totalDurationSeconds
      };
      
      const playlistResponse = {
        items: playlistData,
        totalDuration: totalDuration,
        totalVideos: playlistData.length
      };
        const GenPlaylistData = await generateContent(playlistResponse, playlistId)
        // return playlistData;
        return GenPlaylistData
        } catch (err) {
            console.error("Error fetching playlist data:", err);
            return { error: "Failed to fetch playlist data." };
        }
    }
}
