import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ACCESS_RIGHT_KEY } from '../../core/decorator/access-by.decorator';
import { UserService } from "../../user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const userId = context.switchToHttp().getRequest().user.id;
        //cache ...
        
        const userPermissions = await this.userService.getPermissionbyId(userId)        
        const requiredPermission = this.reflector.get<string[]>(ACCESS_RIGHT_KEY, context.getHandler())
        return requiredPermission.some((permission) => userPermissions.includes(permission))

    }
}