import { BadRequestException, NotFoundException } from "@nestjs/common";

export class PermissionNotFoundException extends NotFoundException{
    errorCode: string

    constructor(){
        super({errorCode: 'NOT_FOUND', message: 'Permission not found'})
    }
}

export class  PermissionAlreadyExistsException extends BadRequestException{
    errorCode: string

    constructor(){
        super({errorCode: 'ALREADY_EXISTS', message: 'Permission already exists'})
    }
}
