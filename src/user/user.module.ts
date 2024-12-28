import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../permission/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleModule } from 'src/role/role.module';
@Module({
  imports: [
  TypeOrmModule.forFeature([User,Role,Permission])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}