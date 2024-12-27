import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty({message: 'Role must not be empty  '})
    name:string

    @IsOptional()
    @IsString()
    description:string

    @IsOptional()
    @IsBoolean()
    isEditable:boolean
    
}
