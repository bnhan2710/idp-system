import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { PagingDto } from '@shared/base/paging.dto';
import { AssginRoleDto } from './dto/assign-role.dto';
import { UserService } from '../user/user.service';
import { 
  RoleAlreadyExistsException,
  RoleNotFoundException,
  RoleNotEditableException,
  SomeRoleNotFoundException
} from './exceptions';
import { Permission } from '../permission/entities/permission.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private userService: UserService
  ) {}

  async create(createRoleDto: CreateRoleDto):Promise<string> {
      const isExist = await this.roleRepository.findOne({where:{name:createRoleDto.name}})
      if(isExist){
        throw new RoleAlreadyExistsException()
      }
      const role = await this.roleRepository.create({...createRoleDto}) 
      await this.roleRepository.save(role)
      return role.id

  }

  async findAll(pagingDo:PagingDto): Promise<any> {
    const page = pagingDo.page ?? 1;
    const limit = pagingDo.limit ?? 10;
    const offset = (page - 1) * limit;
    const cond = {
      order: {
        name: pagingDo.sort as 'ASC' | 'DESC' ?? 'ASC',
      },
      take: limit,
      skip: offset,
    };
   const role = await this.roleRepository.findAndCount(cond)
   return {
      pagination: role[0],
      total: role[1],
      page,
      limit
   }
  }

  async findOne(id: string):Promise<Role> {
    const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new RoleNotFoundException()
    }
    return role
  
  }

  async update(id: string, updateRoleDto: UpdateRoleDto):Promise<void> {
   const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new RoleNotFoundException()
    }
    if(!role.isEditable){
      throw new RoleNotEditableException()
    }
    await this.roleRepository.update({id},{...updateRoleDto})
  }

  async remove(id: string):Promise<void> {
    const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new RoleNotFoundException()
    }
    if(!role.isEditable){
      throw new RoleNotEditableException()
    }
    await this.roleRepository.softDelete({id})
  }

  async updatePermissions(roleId: string, permissions: Permission[]){
      const role = await this.roleRepository.findOne({where:{id:roleId}})
      if(!role){
        throw new RoleNotFoundException()
      }
      role.permissions = permissions
      return this.roleRepository.save(role);
  }

  async assignRole(assignRoleDto:AssginRoleDto){
    const roles  = await this.roleRepository.findByIds(assignRoleDto.roleIds)
    if(roles.length !== assignRoleDto.roleIds.length){
      throw new SomeRoleNotFoundException()
    }
    await this.userService.updateRoles(assignRoleDto.userId, roles);
  }

  async findRoleRelatedPermission(roleNames: string[]) {
    const rolesPermissions = await this.roleRepository.find({
      where: { name: In(roleNames) },
      relations: ['permissions']
    });
    if (!rolesPermissions || rolesPermissions.length === 0) {
      throw new NotFoundException('Role not found');
    }
    return rolesPermissions;
  }
}
