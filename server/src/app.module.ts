import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
