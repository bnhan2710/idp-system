import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  errorCode: string;

  constructor() {
    super({ errorCode: 'INVALID_TOKEN', message: 'Token is invalid or expired'});
  }
}

