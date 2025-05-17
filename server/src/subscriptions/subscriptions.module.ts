import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriptions } from './subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriptions])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService]
})
export class SubscriptionsModule { }
