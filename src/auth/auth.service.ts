import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService, EnvironmentKeyFactory } from '@shared/services';
import { IUser } from '../user/user.interface';
import { Response } from 'express';
import { InvalidTokenException } from './exceptions/invalid-token-exception';
@Injectable()
export class AuthService {
  constructor(
    private userService : UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private envConfig: EnvironmentKeyFactory

  ) {}
  
  async validateUser(username:string, password: string):Promise<any>{
    const user = await this.userService.findOneByUsername(username)
    if( user && (await this.bcryptService.compare(password,user.password))){
        const { password, ...result  } = user
        return result
      }
    return null
  }

  async generateAccessToken(payload): Promise<{accessToken: string}> {
    const accessToken = await this.jwtService.signAsync(payload,{
      expiresIn: this.envConfig.getAccessTokenExpiration(),
      secret: this.envConfig.getJwtSecret()
    })
    return {
      accessToken
    }
  }

  async generateRefreshToken(payload): Promise<{refreshToken:string}> {
    const refreshToken = await this.jwtService.signAsync(payload,{
      expiresIn: this.envConfig.getRefeshTokenExpiration(),
      secret: this.envConfig.getJwtSecret()
    })
    return {
      refreshToken
    }
  }


  async login(user: IUser,res: Response) {
    const payload = { username: user.username, id: user.id };
    const accessToken = await this.generateAccessToken(payload)
    const refreshToken = await this.generateRefreshToken(payload)
    res.cookie('refreshToken', 
      refreshToken, 
      { 
        expires: new Date(Date.now() + this.envConfig.getRefeshTokenExpiration()),
        httpOnly: true 
      })
    return accessToken
  }

  async renewToken(refreshToken:string) {
    const decoded =  this.jwtService.verify(refreshToken,{
        secret: this.envConfig.getJwtSecret()
      })
      if(!decoded){
        throw new InvalidTokenException()
      }
      const payload = { username:decoded.username, sub: decoded.id }
      return await this.generateAccessToken(payload) 
  }
}

