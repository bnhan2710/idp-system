import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../shared/services';
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

  findAll(): Promise<User[] | null> {
    return  this.userRepository.find({
      relations: ['roles'],
      skip: 0, 
      take: 20
    })
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
