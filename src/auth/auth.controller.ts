import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response,Request } from 'express';
import { IUser } from '../user/user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseMessage } from '../core/decorator';
import { Public,User } from '../core/decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('Login successfully')
  login(
    @User() user: IUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(user,res);
  }

  @Public()
  @Post('refresh')
  @ResponseMessage('Process a new token')
  renewToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res:Response
  ) {
    const { refreshToken } = req.cookies['refreshToken']
    return this.authService.renewToken(refreshToken)
  }

  @Delete('logout')
  @ResponseMessage('Logout success')
  logout(
    @Res() res: Response
  ){
    res.clearCookie('refreshToken')
  }
}
