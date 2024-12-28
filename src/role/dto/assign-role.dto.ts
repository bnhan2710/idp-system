import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class AssginRoleDto {
    
    @IsUUID()
    @IsNotEmpty()
    userId:string
    
    @IsArray({message: 'Role ID must be an array of UUIDs '})
    @IsUUID("4",{each:true})
    roles:string[]
}