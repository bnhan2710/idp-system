import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IUser } from '../user/user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseMessage } from '../core/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('Login success')
  login(@Body() user: IUser) {
    return this.authService.login(user);
  }

}
