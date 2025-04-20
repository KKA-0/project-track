import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { googleAuth } from './../utils/google/googleAuth'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  create(user_name: string, email: string, source: string): Promise<User> {
    const user = this.usersRepository.create({ user_name, email, source });
    return this.usersRepository.save(user);
  }

async googleLogin(google_auth_token: string) {
    const userInfo = await googleAuth(google_auth_token);
    if(userInfo.status === 401){
        console.log("error agaya bhai!!!")
        return { error: "Invalid Google authentication token." };
    }

    const { given_name, email } = userInfo
    const AuthBody = { user_name: given_name, email, source: 'google' }
    const isExist = await this.usersRepository.findOneBy({ email })
    if(isExist){
        const payload = { id: isExist.id, email: isExist.email }
        const access_token = await this.jwtService.signAsync(payload)
        return { access_token, user_info: isExist }
    }
    const newUser = await this.usersRepository.create(AuthBody)
    const createdUser = await this.usersRepository.save(newUser)
    const payload = { id: createdUser.id, email: createdUser.email }
    const access_token = await this.jwtService.signAsync(payload)
    return { access_token, user_info: createdUser }
    }
}   