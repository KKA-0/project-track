import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { Plans } from './plans.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsModule } from 'src/playlists/playlists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plans]), PlaylistsModule],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule { }
