import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage } from 'src/core/decorator';
import { PagingDto } from '@shared/base/paging.dto';
import { AssginRoleDto } from './dto/assign-role.dto';
import { Identified } from '../core/decorator/indentified.decorator';
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Identified
  @Post()
  @ResponseMessage('Create role successfully')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  
  @Get()
  @ResponseMessage('Get all role with pagination')
  findAll(
    @Query() qs: PagingDto
  ) {
    return this.roleService.findAll(qs);
  }

  @Get(':id')
  @ResponseMessage('Get role successfully')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update role successfully')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete role successfully')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Post('assign')
  @ResponseMessage('Assign role to user sucessfully')
  assignRole(
    @Body() assignRoleDto:AssginRoleDto
  ){
    return this.roleService.assignRole(assignRoleDto)
  }
  
}
