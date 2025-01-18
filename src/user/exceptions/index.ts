import { BadRequestException, NotFoundException } from "@nestjs/common"

export class UserNotFoundException extends NotFoundException{ 
    errrorCode: string;

    constructor(){
        super({errorCode: 'NOT_FOUND', message: 'User not found'})
    }
}

export class UserAlreadyExistsException extends BadRequestException{
    errorCode: string;

    constructor(){
        super({errorCode: 'ALREADY_EXISTS', message: 'User already exists'})
    }
}