import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => RoleModule), 
    forwardRef(() => UserModule), 
    TypeOrmModule.forFeature([Permission,Role])],
  controllers: [PermissionController],
  providers: [PermissionService,RoleService],
})
export class PermissionModule {}
