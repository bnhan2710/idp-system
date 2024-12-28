import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage,User } from '../core/decorator';
import { IUser } from './user.interface';
import { PagingDto } from '@shared/base/paging.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ResponseMessage('Create user successfully')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Get all user')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() qs:PagingDto
  ) {
    return this.userService.findAll(qs);
  }

  @Get('me')
  @ResponseMessage('Get profile success')
  getProfile(
    @User() user:IUser
  ){
    return this.userService.findOneById(user.id)
  }

  @Get(':id')
  @ResponseMessage('Get user successfully')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }


  @Patch(':id')
  @ResponseMessage('Update user successfully')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @Delete(':id')
  @ResponseMessage('Delete user successfully')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
