import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playlistsRepository: Repository<Playlist>,
    ) { }

    async createPlaylist(playlist_id: string, playlist_name: string, playlist_json: any, user_id: number) {
        const playlist = this.playlistsRepository.create({
            playlist_id,
            playlist_name,
            playlist_json,
            user_id,
        });
        return await this.playlistsRepository.save(playlist);
    }

    async findByUserId(user_id: number) {
        return this.playlistsRepository.query(
            `SELECT 
              playlist_id as playlistid,
              playlist_json->>'title' as title,
              playlist_json->>'info' as info,
              playlist_json->>'channelname' as channelname,
              playlist_json->>'completed' as completed,
              playlist_json->'totalduration' as totalduration,
              playlist_json->>'totalvideos' as totalvideos,
              playlist_json->'sections' as sections
            FROM playlist
            WHERE user_id = $1`,
            [user_id]
        );
    }

    async findOne(id: string, user_id: number) {
        return this.playlistsRepository.findOne({
            where: {
                user_id,
                playlist_id: id,
            },
        });
    }

    async updateVideoStatus(
        body: { playlistId: string; section: string; videoTitle: string; checked: boolean; completedState: number },
        user_id: number
    ) {
        // Log the values for debugging
        console.log('Updating video status with:', {
            section: body.section,
            videoTitle: body.videoTitle,
            checked: body.checked,
            completedState: body.completedState,
            playlistId: body.playlistId,
            userId: user_id
        });

        // Execute the update query
        const result = await this.playlistsRepository.query(
            `UPDATE playlist
             SET playlist_json = jsonb_set(
               jsonb_set(
                 playlist_json,
                 ARRAY['sections', $1, $2, 'done'],
                 to_jsonb($3::boolean)
               ),
               ARRAY['completed'],
               to_jsonb($4::numeric)
             )
             WHERE playlist_id = $5 AND user_id = $6
             RETURNING playlist_json->'completed' as updated_completed`,
            [
                body.section,                  // $1
                body.videoTitle,               // $2
                body.checked,                  // $3 - store actual boolean instead of 0/1
                body.completedState,           // $4 - completed value at root
                body.playlistId,               // $5
                user_id                        // $6
            ]
        );

        // Log the result for verification
        console.log('Update result:', result);

        if (!result || result.length === 0) {
            console.error('No rows were updated. Check if the record exists with the given playlist_id and user_id.');
            return false;
        }

        console.log('Updated completed value:', result[0].updated_completed);
        return true;
    }

    async findPlaylistByUserIDandPlaylistId(user_id: number, playlist_id: string) {
        return this.playlistsRepository.findOne({
            where: {
                user_id,
                playlist_id,
            },
        });
    }
}
