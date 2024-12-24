import { BcryptService,EnvironmentKeyFactory } from "./services";
import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "@nestjs/config";
@Global()
@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    providers: [BcryptService, EnvironmentKeyFactory],
    exports: [BcryptService, EnvironmentKeyFactory],
})

export class SharedModule {}