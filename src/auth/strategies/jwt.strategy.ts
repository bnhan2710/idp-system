import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { IUser } from '../../user/user.interface';
import { EnvironmentKeyFactory } from '@shared/services';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(
      envConfig : EnvironmentKeyFactory ,  
     ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: envConfig.getJwtSecret()
    });
}

    //decode user 
    async(payload: IUser){ 
        return payload
    }

} 