import { BcryptService, EnvironmentKeyFactory } from "./services";
import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheService } from "./services/cache.service";
import { redisStore } from 'cache-manager-redis-yet';
@Global()
@Module({
    imports: [
        DatabaseModule,
        CacheModule.registerAsync({
            isGlobal:true,
            inject:[ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    store: redisStore,
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    ttl: configService.get<number>('CACHE_TTL'),
                };
            }
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [BcryptService, EnvironmentKeyFactory, CacheService],
    exports: [BcryptService, EnvironmentKeyFactory, CacheService],
})

export class SharedModule {}