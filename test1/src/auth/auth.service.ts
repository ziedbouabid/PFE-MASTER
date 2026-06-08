import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if(user){
      const ismatch = await bcrypt.compare(pass,user.password)
      if (user && ismatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const  JwtPayload = {
      email: user.email,
    };
    
   
    return {
      access_token: this.jwtService.sign(JwtPayload),
    };
  }
}