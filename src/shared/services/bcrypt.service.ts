import { compare, genSalt, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { EnvironmentKeyFactory } from './environment-key.factory'

@Injectable()
export class BcryptService {
  private readonly saltRounds: number;

  constructor(configService: EnvironmentKeyFactory) {
    this.saltRounds = configService.getSaltRounds();
  }

  public async hash(data: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return hash(data, salt);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(encrypted, data);
  }
  
}