import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './database/typeorm.module';
import { AuthModule } from './auth-service/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
