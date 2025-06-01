import { Injectable } from '@nestjs/common';
import { Plans } from './plans.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistsService } from 'src/playlists/playlists.service';
const generatePlan = require('./../../gemini/gemini.plan.js');

@Injectable()
export class PlansService {
    constructor(
        @InjectRepository(Plans)
        private plansRepository: Repository<Plans>,
        private playlistsService: PlaylistsService
    ) {

    }

    async createPlan(playlist_id: string, user_id: number) {

        const playlist = await this.playlistsService.findPlaylistByUserIDandPlaylistId(user_id, playlist_id)
        const GenPlaylistData = await generatePlan(playlist.playlist_json, new Date().toISOString(), "4 Weeks", "2 Hours")
        return GenPlaylistData
        // console.log(GenPlaylistData)

        // const planData = this.plansRepository.create({
        //     playlist_id,
        //     playlist_name,
        //     playlist_json,
        //     user_id,
        // });
        // return this.plansRepository.save(playlist);
    }
}
