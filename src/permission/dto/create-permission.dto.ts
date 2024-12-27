import { IsNotEmpty, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreatePermissionDto {
    
    @IsString({message: 'Permission must be a string  '})
    @IsNotEmpty({message: 'Permission must not be empty  '})
    @MinLength(3, {message: 'Permission must be longer than or equal to 3 characters '})
    @MaxLength(50, {message: 'Permission must be shorter than or equal to 50 characters '})
    name:string

    @IsOptional()
    @IsString({message: 'Description must be a string  '})
    description:string
    
}
