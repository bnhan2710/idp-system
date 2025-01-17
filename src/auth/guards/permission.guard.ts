import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ACCESS_RIGHT_KEY } from '../../core/decorator/access-by.decorator';
import { UserService } from "../../user/user.service";
import { Injectable } from "@nestjs/common";
import { CacheService } from "@shared/services/cache.service";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService,
        private readonly cacheService: CacheService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const userId = context.switchToHttp().getRequest().user.id;
        let userPermissions = await this.cacheService.getUserPermissions(userId)
        if(!userPermissions){
            userPermissions = await this.userService.getUserPermissionbyId(userId)
            await this.cacheService.setUserPermission(userId,userPermissions)
        }
        const requiredPermission = this.reflector.get<string[]>(ACCESS_RIGHT_KEY, context.getHandler())
        return requiredPermission.some((permission) => userPermissions.includes(permission))
    }
}