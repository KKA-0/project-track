import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriptions } from './subscriptions.entity';
import crypto from 'crypto';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscriptions)
        private subscriptionsRepository: Repository<Subscriptions>,
    ) { }

    async createSubscription(user_id: number,) {
        const subscription = this.subscriptionsRepository.create({ user_id: { id: user_id }, plan: 'premium', start_date: new Date(), end_date: new Date() });
        return await this.subscriptionsRepository.save(subscription);
    }


    async webhookSubscription(signature: string, body: any) {
        const WEBHOOK_SECRET = process.env.POCKETFLOW_WEBHOOK_SECRET;
        const receivedSignature = signature;

        // Generate expected signature
        const cryptoModule = (typeof crypto !== 'undefined' ? crypto : require('crypto'));
        const expectedSignature = cryptoModule
            .createHmac('sha256', WEBHOOK_SECRET)
            .update(JSON.stringify(body))
            .digest('hex');
        if (receivedSignature === expectedSignature) {
            console.log('Valid webhook received:', body);
            return { status: 'success', body };
        } else {
            console.error('Invalid webhook signature');
            return { error: 'Invalid signature', body };

        }
    }
}
