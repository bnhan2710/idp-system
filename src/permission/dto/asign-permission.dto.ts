import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AssignPermissionDto{
    @IsUUID("4", { message: 'Role ID must be a UUID ' })
    @IsNotEmpty({message: 'Role ID must not be empty  '})
    roleId:string

    @IsArray({message: 'Permissions must be an array of UUIDs '})
    @IsUUID("4", { each: true })
    permissions: string[]
}