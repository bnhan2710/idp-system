import { NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";

export const ErrRoleNotFound = new NotFoundException('Role not found')
export const ErrSomeRoleNotFound = new NotFoundException('Some role not found')
export const ErrRoleAlreadyExists = new BadRequestException('Role already exists')
export const ErrRoleNotEditable = new ForbiddenException('Role cannot be edit')
