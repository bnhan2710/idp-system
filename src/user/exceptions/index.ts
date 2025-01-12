import { BadRequestException, NotFoundException } from "@nestjs/common"

export const ErrUserNotFound = new NotFoundException('User not found')
export const ErrUserAlreadyExists = new BadRequestException('User already exists')
