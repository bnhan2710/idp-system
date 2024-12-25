import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService, EnvironmentKeyFactory } from '@shared/services';
import { IUser } from '../user/user.interface';
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

  async generateAccessToken(payload): Promise<{access_token: string}> {
    const accessToken = await this.jwtService.signAsync(payload,{
      expiresIn: this.envConfig.getAccessTokenExpiration(),
      secret: this.envConfig.getJwtSecret()
    })
    return {
      access_token: accessToken
    }
  }


  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return await this.generateAccessToken(payload)
  }
}
