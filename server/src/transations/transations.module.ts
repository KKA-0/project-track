import { Module } from '@nestjs/common';
import { TransationsController } from './transations.controller';
import { TransationsService } from './transations.service';

@Module({
  controllers: [TransationsController],
  providers: [TransationsService]
})
export class TransationsModule {}
