/* eslint-disable prettier/prettier */
import {Controller, Post, Body, ValidationPipe, UseGuards, Get, Patch,  Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import path from 'path';
import { ForgotPasswordDto } from 'src/users/dto/forgot-password.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /*  @Post('/forgotPassword')
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto:ForgotPasswordDto): Promise<any>{
    return this.authService.forgotPassword(forgotPasswordDto);

  } */

  /* @Patch('/changePassword')
    @UseGuards(AuthGuard())
    async changePassword(
        @GetUser() user:User,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(user.email, changePasswordDto);
} */
}


