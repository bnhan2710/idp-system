import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../shared/services';
import { PagingDto } from '@shared/base/paging.dto';
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
      throw new BadRequestException('Username already exists')
    }
    const hashedPassword = await this.bcryptService.hash(createUserDto.password);
    const user = await this.userRepository.create({ ...createUserDto, password: hashedPassword })
    await this.userRepository.save(user)
 
    return user.id
  }

  async findAll(pagingDto: PagingDto): Promise<User[]> {
    const limit = pagingDto.limit ?? 10;
    const offset = (pagingDto.page - 1) * limit;
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
    };

    return this.userRepository.find(cond);
  }

  async findOneById(id: string):Promise<Partial<User>> {
    const isUserExist = await this.userRepository.findOne({where:{id}})
    if(!isUserExist){
      throw new NotFoundException('User not found')
    }
    const {password, ...result } = isUserExist
    return result
  }

  async findOneByUsername(username:string):Promise<User> {
    return this.userRepository.findOneBy({username})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    await this.userRepository.update({ id: id }, { ...updateUserDto })
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    await this.userRepository.softDelete({id})
  }
}
