import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth-service/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
