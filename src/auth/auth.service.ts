import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@shared/services';
import { IUser } from '../user/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private userService : UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService

  ) {}
  async validateUser(username:string, password: string):Promise<any>{
    const user = await this.userService.findOneByUsername(username)
    if( user && (await this.bcryptService.compare(password,user.password))){
        const { password, ...result  } = user
        return result
      }
    return null
  }

  
  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
