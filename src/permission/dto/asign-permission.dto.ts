import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AssignPermissionDto{
    @IsUUID("4", { message: 'Role ID must be a UUID ' })
    @IsNotEmpty({message: 'Role ID must not be empty  '})
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'UUID of the role',
    })
    roleId:string

    @IsArray({message: 'Permissions must be an array of UUIDs '})
    @IsUUID("4", { each: true })
    @ApiProperty({
        example: ['123e4567-e89b-12d3-a456-426614174000'],
        description: 'Array of UUIDs of the permissions'
    })
    permissionIds: string[]
}