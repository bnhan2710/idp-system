import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { PagingDto } from '@shared/base/paging.dto';
import { AssginRoleDto } from './dto/assign-role.dto';
import { UserService } from '../user/user.service';
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
        throw new BadRequestException('Role already exists')
      }
      const role = await this.roleRepository.create({...createRoleDto}) 
      await this.roleRepository.save(role)
      return role.id

  }

  async findAll(pagingDo:PagingDto): Promise<Role[]> {
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
    return this.roleRepository.find(cond)
  }

  async findOne(id: string):Promise<Role> {
    const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new BadRequestException('Role not found')
    }
    return role
  }

  async update(id: string, updateRoleDto: UpdateRoleDto):Promise<void> {
   const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new BadRequestException('Role not found')
    }
    if(!role.isEditable){
      throw new BadRequestException(`Role ${role.name} cannot be edit`)
    }
    await this.roleRepository.update({id},{...updateRoleDto})
  }

  async remove(id: string):Promise<void> {
    const role = await this.roleRepository.findOne({where:{id}})
    if(!role){
      throw new BadRequestException('Role not found')
    }
    if(!role.isEditable){
      throw new BadRequestException(`Role ${role.name} cannot be delete`)
    }
    await this.roleRepository.softDelete({id})
  }

  async updatePermissions(roleId: string, permissions: string[]){
      const role = await this.roleRepository.findOne({where:{id:roleId}})
      if(!role){
        throw new NotFoundException('Role not found')
      }
      const permissionsToUpdate = permissions.map(permission => ({ id: permission }));
      this.roleRepository.merge(role, { permissions: permissionsToUpdate });
      return this.roleRepository.save(role);
  }

  async assignRole(assignRoleDto:AssginRoleDto){
    const user = await this.userService.findOneById(assignRoleDto.userId)
    if(!user){
      throw new NotFoundException('User not found')
    }
    const roleArr = user.roles ?? []
    for (const roleId of assignRoleDto.roles) {
      const role = await this.roleRepository.findOne({ where: { id: roleId } });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      roleArr.push(role);
    }
    const roleIds = roleArr.map(role => role.id);
    await this.userService.updateRoles(user.id, roleIds);
  }
}
