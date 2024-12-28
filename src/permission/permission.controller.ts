import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ResponseMessage } from 'src/core/decorator';
import { PagingDto } from '@shared/base/paging.dto';
import { AssignPermissionDto } from './dto/asign-permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ResponseMessage('Create permission successfullly')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage('Fetch permission with pagination')
  findAll(
    @Query() qs: PagingDto
  ) {
    return this.permissionService.findAll(qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update permission successfully')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete permission successfully')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }

  @Post('assign')
  @ResponseMessage('Assign permission to role succesfully')
  assignPermission(
    @Body() assignPermissionDto: AssignPermissionDto){
    return this.permissionService.assignPermission(assignPermissionDto)
  }

}
