import { InvalidLoginException } from "../exceptions/invalid-login.exception";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from '../auth.service';
import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username:string,password:string): Promise<any> {
        const user = await this.authService.validateUser(username,password)
        if(!user){
            throw new InvalidLoginException()
        }
        return user // req.user
    }   


} 