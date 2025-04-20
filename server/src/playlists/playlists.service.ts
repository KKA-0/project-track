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
        body: { playlistId: string; section: string; videoTitle: string; checked: boolean },
        user_id: number
    ) {
        this.playlistsRepository.query(
            `UPDATE playlist
             SET playlist_json = jsonb_set(
               playlist_json,
               ARRAY['sections', $1, $2, 'done'],
               to_jsonb($3::int)
             )
             WHERE playlist_id = $4 AND user_id = $5`,
            [
              body.section,
              body.videoTitle,
              body.checked ? 1 : 0,
              body.playlistId,
              user_id
            ]
          );
    }


}
