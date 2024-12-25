import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../../core/decorator/public.decorator";
import { InvalidTokenException } from "../exceptions/invalid-token-exception";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super()
    }

      //check if the route is public or not

      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          console.log(isPublic)
          if (isPublic) {
            return true;
          }
        // if not public, call super.canActivate to check if user is authenticated
        return super.canActivate(context);
      }

      handleRequest(err, user, info) {
        //if error or user is not found
        if (err || !user) {
          throw err || new InvalidTokenException()
        }
        return user;
      }

}
