import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (!isUuid(value)) {
      throw new BadRequestException(`Invalid UUID: "${value}"`);
    }
    return value;
  }
}