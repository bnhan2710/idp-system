import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PagingDto } from '@shared/base/paging.dto';
import { RoleService } from '../role/role.service';
import { AssignPermissionDto } from './dto/asign-permission.dto';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly roleRoleService : RoleService
  ) {}

  async create(createPermissionDto: CreatePermissionDto):Promise<string> {
    const isExist = await this.permissionRepository.findOne({where:{name:createPermissionDto.name}})
    if(isExist){
      throw new BadRequestException('Permission already exist')
    }
    const permission = await this.permissionRepository.create({...createPermissionDto})
    await this.permissionRepository.save(permission)
    return permission.id
  }

  async findAll(pagingDto:PagingDto) {
        const page = pagingDto.page ?? 1;
        const limit = pagingDto.limit ?? 10;
        const offset = (page - 1) * limit;
        const cond = {
          where: [
            { name: Like(`%${pagingDto.search ?? ''}%`) },     
            { description: Like(`%${pagingDto.search ?? ''}%`) }   
          ],
          order: {
            name: pagingDto.sort as 'ASC' | 'DESC' ?? 'ASC',
          },
          take: limit,
          skip: offset,
        };
    
        return this.permissionRepository.find(cond);
  }

  async findOne(id: string):Promise<Permission> {
      const permission = await this.permissionRepository.findOne({where:{id}})
      if(!permission){
        throw new NotFoundException('Permission not found')
      }
      return permission 
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.findOne({where:{id}})
    if(!permission){
      throw new NotFoundException('Permission not found')
    }
    await this.permissionRepository.update({id},{...updatePermissionDto})
  }

  async remove(id: string) {
    const permission = await this.permissionRepository.findOne({where:{id}})
    if(!permission){
      throw new NotFoundException('Permission not found')
    }
    await this.permissionRepository.softDelete({id})
  }

  async assignPermission(assignPermissionDto: AssignPermissionDto) {
    const role = await this.roleRoleService.findOne(assignPermissionDto.roleId);
    const permissionArr = role.permissions ?? [];
  
    for (const permissionId of assignPermissionDto.permissions) {
      const permission = await this.permissionRepository.findOne({ where: { id: permissionId } });
      if (!permission) {
        throw new NotFoundException('Permission not found');
      }
      permissionArr.push(permission);
    }
    const permissionIds = permissionArr.map(permission => permission.id);
    this.roleRoleService.updatePermissions(role.id, permissionIds);
  }
  
}
