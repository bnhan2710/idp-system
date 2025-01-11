import { NotFoundException } from "@nestjs/common";

export const ErrNotFoundPermission = new NotFoundException('Permission not found')
export const ErrPermissionAlreadyExists = new NotFoundException('Permission already exists')
export const ErrSomePermissionNotFound = new NotFoundException('Some permission not found')