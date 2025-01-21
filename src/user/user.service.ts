import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../shared/services';
import { PagingDto } from '@shared/base/paging.dto';
import { Role } from '../role/entities/role.entity';
import { UserAlreadyExistsException, UserNotFoundException } from './exceptions';
@Injectable()
export class UserService {
  constructor(
     @InjectRepository(User) 
     private readonly userRepository: Repository<User>,
     private readonly bcryptService : BcryptService
) {}
  async create(createUserDto: CreateUserDto):Promise<string> {
    const isExist = await this.userRepository.findOne({where:{username:createUserDto.username}})
    if(isExist){
      throw new UserAlreadyExistsException()
    }
    const hashedPassword = await this.bcryptService.hash(createUserDto.password);
    const user = await this.userRepository.create({ ...createUserDto, password: hashedPassword })
    await this.userRepository.save(user)
 
    return user.id
  }

  async findAll(pagingDto: PagingDto): Promise<any> {
    const page = pagingDto.page ?? 1;
    const limit = pagingDto.limit ?? 10;
    const offset = (page - 1) * limit;

    const cond = {
      where: [
        { email: Like(`%${pagingDto.search ?? ''}%`) },
        { username: Like(`%${pagingDto.search ?? ''}%`) },
      ],
      order: {
        username: pagingDto.sort as 'ASC' | 'DESC' ?? 'ASC',
      },
      take: limit,
      skip: offset,
      select: {
        username: true,
        email: true,
        fullName: true,
        birthDay: true,
        phoneNumber: true,
      },
    };

    const users = await this.userRepository.findAndCount(cond)
  
    return {
      pagination: users[0],
      total: users[1],
      page,
      limit
    }
  }

  async findOneById(id: string):Promise<Partial<User>> {
    const isUserExist = await this.userRepository.findOne({where:{id}})
    if(!isUserExist){
      throw new UserNotFoundException()
    }
    const {password, ...result } = isUserExist
    return result
  }

  async findOneByUsername(username:string):Promise<User> {
    return this.userRepository.findOneBy({username})
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<void> {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new UserNotFoundException()
    }
    await this.userRepository.update({ id: id }, { ...updateUserDto })
  }

  async remove(id: string):Promise<void> {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new UserNotFoundException()
    }
    await this.userRepository.softDelete({id})
  }

  async updateRoles(id: string, roles: Role[]):Promise<void> {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new UserNotFoundException()
    }
    user.roles = roles
    await this.userRepository.save(user)
  }

  async getUserPermissionbyId(id:string){
    const user = await this.userRepository.findOne({
      relations: ['roles','roles.permissions'],
      where: { id }
    })
    if(!user){
      throw new UserNotFoundException()
    }
    const permissions = user.roles?.map((role) => role.permissions.map((per) => per.name)).flat()
    return permissions
  }

}
