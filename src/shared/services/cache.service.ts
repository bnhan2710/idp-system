import { Injectable, Inject,Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {

   constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    private getUserPermissionKey(userId:string){
        return `userPermissions${userId}`
    }

    private async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
    }

    private async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    private async set(key: string, value: any, ttl: number): Promise<void> {
      await this.cacheManager.set(key, value, ttl);
    }

    async getUserPermissions(userId): Promise<string[]>{
        return await this.cacheManager.get(this.getUserPermissionKey(userId))
    }

    async setUserPermission(userId:string, permissions:string[]) {
        await this.cacheManager.set(this.getUserPermissionKey(userId), permissions, 1000*60*60*24)
    }

}