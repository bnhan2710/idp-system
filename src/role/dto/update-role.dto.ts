import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({
        example: 'Role name',
        description: 'Name of the role',
    })
    name?: string;

    @ApiProperty({
        example: 'Role description',
        description: 'Description of the role',
    })
    description?: string;

}
