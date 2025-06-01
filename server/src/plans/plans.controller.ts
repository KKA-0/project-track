import { Controller, Post, Body } from '@nestjs/common';
const generatePlan = require('./../../gemini/gemini.plan.js');
import { PlansService } from './plans.service';
@Controller('plans')
export class PlansController {
    constructor(private plansService: PlansService) { }

    @Post()
    createPlan(@Body() body: { playlist_id: string, user_id: number }) {
        return this.plansService.createPlan(body.playlist_id, body.user_id);
    }
}
