import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage,User } from '../common/decorator';
import { IUser } from './user.interface';
import { PagingDto } from '@shared/base/paging.dto';
import { CanAccessBy, Identified } from '@common/decorator/index';
import { AccessPermission } from '@common/constants/permission';
import { UuidValidationPipe } from '@common/pipes/uuid-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CanAccessBy(AccessPermission.CREATE_USER)
  @Post()
  @ResponseMessage('Create user successfully')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @CanAccessBy(AccessPermission.VIEW_USERS)
  @Get()
  @ResponseMessage('Get all user')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() qs:PagingDto
  ) {
    return this.userService.findAll(qs);
  }

  @Identified
  @Get('me')
  @ResponseMessage('Get profile success')
  getProfile(
    @User() user:IUser
  ){
    return this.userService.findOneById(user.id)
  }

  @Get(':id')
  @ResponseMessage('Get user successfully')
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.userService.findOneById(id);
  }

  @Identified
  @Patch(':id')
  @ResponseMessage('Update user successfully')
  update(@Param('id', UuidValidationPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  @ResponseMessage('Delete user successfully')
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
