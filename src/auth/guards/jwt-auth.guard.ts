import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "@common/decorator/public.decorator";
import { InvalidTokenException } from "../exceptions/invalid-token-exception";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super()
    }
      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
        return super.canActivate(context);
      }
        
      handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new InvalidTokenException()
        }
        return user;
      }

}
