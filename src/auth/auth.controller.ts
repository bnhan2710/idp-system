import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../user/user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseMessage } from '../core/decorator';
import { Public,User } from '../core/decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public ()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('Login success')
  login(@User() user: IUser) {
    return this.authService.login(user);
  }

}
