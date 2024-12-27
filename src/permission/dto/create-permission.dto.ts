import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePermissionDto {
    
    @IsString()
    @IsNotEmpty({message: 'Permission must not be empty  '})
    name:string

    @IsOptional()
    @IsString()
    description:string

}
