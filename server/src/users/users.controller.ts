import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: { user_name: string; email: string, source: string }) {
    return this.usersService.create(body.user_name, body.email, body.source);
  }
  @Post('google/login')
  googleLogin(@Body() body: { google_auth_token: string}) {
    return this.usersService.googleLogin(body.google_auth_token);
  }
  
  
}
