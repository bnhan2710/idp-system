import { NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";

export class RoleNotFoundException extends NotFoundException{
    errorCode: string

    constructor(){
        super({errorCode: 'NOT_FOUND', message: 'Role not found'})
    }
}

export class RoleAlreadyExistsException extends BadRequestException{
    errorCode: string
    constructor(){
        super({errorCode: 'ALREADY_EXISTS', message: 'Role already exists'})
    }
}

export class RoleNotEditableException extends ForbiddenException{
    errorCode: string
    constructor(){
        super({errorCode: 'NOT_EDITABLE', message: 'Role cannot be edit'})
    }
}

export class SomeRoleNotFoundException extends NotFoundException{
    errorCode: string
    constructor(){
        super({errorCode: 'NOT_FOUND', message: 'Some role not found'})
    }
}