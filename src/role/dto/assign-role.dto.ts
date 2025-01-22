import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class AssginRoleDto {
    
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'UUID of the user',
    })
    userId:string
    
    @IsArray({message: 'Role ID must be an array of UUIDs '})
    @IsUUID("4",{each:true})
    @ApiProperty({
        example: ['123e4567-e89b-12d3-a456-426614174000'],
        description: 'Array of UUIDs of the roles',
    })
    roleIds:string[]
}