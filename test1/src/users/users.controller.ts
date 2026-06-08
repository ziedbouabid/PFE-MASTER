import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';



@Controller('users')
export class UsersController {
  constructor(private Service: UsersService) { }

  @Post("addUser")
  async create(@Body() user: User) {
    user.password = await bcrypt.hash(user.password, 10);

    return await this.Service.createUser(user);
  }

  @Post("updateUser")
  async updateUser(@Body() user: User) {
    return await this.Service.updateUser(user);
  }

  @Get("getChplns")
  async getChpln() {
    return await this.Service.getChplns();
  }

  @Get("getEmployes")
  async getEmployes() {
    return await this.Service.getEmployes();
  }
  // This route will require successfully passing our default auth strategy (JWT) in order
  // to access the route
  @Get('test')
  @UseGuards(AuthGuard())
  testAuthRoute() {
    return {
      message: 'You did it!',
    };
  }
  @Get('getUser/:email')
  async getUser(@Param('email') email): Promise<User> {
    return await this.Service.findOneByEmail(email);

  }
}
