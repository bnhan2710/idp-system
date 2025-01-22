import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) 
{
    @ApiProperty({
        example: 'Permission name',
        description: 'Name of the permission',
    })
    name?: string;

    @ApiProperty({
        example: 'Permission description',
        description: 'Description of the permission',
    })
    description?: string;

}
