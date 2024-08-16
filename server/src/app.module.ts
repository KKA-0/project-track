import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
