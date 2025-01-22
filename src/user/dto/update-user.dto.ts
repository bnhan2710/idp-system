import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['username', 'password'] as const),
  ) {

    @ApiProperty({
        example: 'Full Name',
        description: 'Full name of the user',
    })
    fullName?: string;

    @ApiProperty({
        example: '0123456789',
        description: 'Phone number of the user',
    })
    phoneNumber?: string;

    @ApiProperty({
        type: Date,
        example: '1999-01-01',
        description: 'Birth day of the user',
    })
    birthDay?: Date;

  }


