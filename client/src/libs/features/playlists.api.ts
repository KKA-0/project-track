import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createPlaylist = createAsyncThunk(
  'playlists/createPlaylist',
  async (playlistData: {url: any}, thunkAPI) => {
    try{
        console.log(playlistData.url)
        const response = await axios.post('http://localhost:4000/playlists', 
          {
            "playlistId": playlistData.url
          }
        );
        console.log(response.data)
        return response.data;
    }catch(err){
        console.error(err);
    }
  }
)