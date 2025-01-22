import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response,Request } from 'express';
import { IUser } from '../user/user.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseMessage } from '../common/decorator';
import { Public,User } from '@common/decorator/index';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({type: LoginDto})
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
  @Get('refresh')
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
