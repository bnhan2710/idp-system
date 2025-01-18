import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../../auth/guards/permission.guard'; 
import { Identified } from './indentified.decorator';
export const ACCESS_RIGHT_KEY = 'rights';

export function CanAccessBy(...rights: string[]) {
    return applyDecorators(
        SetMetadata(ACCESS_RIGHT_KEY, rights),
        Identified,
        UseGuards(PermissionGuard)
    );
}