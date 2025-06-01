import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    @Post()
    async createSubscription(@Body() body: { user_id: number }) {
        return this.subscriptionsService.createSubscription(body.user_id);
    }

    @Post('webhook')
    async webhookSubscription(@Headers('x-pocketsflow-signature') signature: string, @Body() body: any) {
        return this.subscriptionsService.webhookSubscription(signature, body);
    }
}
