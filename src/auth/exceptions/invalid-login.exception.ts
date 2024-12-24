import { UnauthorizedException } from '@nestjs/common';

export class InvalidLoginException extends UnauthorizedException {
  errorCode: string;

  constructor() {
    super({ errorCode: 'INVALID_LOGIN', message: 'Username or password is invalid' });
  }
}