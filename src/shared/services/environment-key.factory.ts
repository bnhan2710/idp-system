import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { isBooleanString } from 'class-validator';


@Injectable()
export class EnvironmentKeyFactory{
    constructor(private readonly configService: ConfigService) {}

    private get(key: string): string {
      const value = this.configService.get<string>(key);
  
    if (!value) {
      throw new Error(`Missing key: ${key} in environment setup`);
    }
  
    return value;
  }

  public getNumber(key: string): number {
      const value = Number(this.get(key));
      
      if (isNaN(value)) {
        throw new Error(key + ' environment variable is not a number');
      }
  
      return value;
    }

    private getBoolean(key: string): boolean {
      const value = this.get(key).toLowerCase();
  
      if (!isBooleanString(value)) {
        throw new Error(`${key} environment variable is not a boolean`);
      }
  
      return value === 'true';
    }

  public getString(key: string): string {
      const value = this.get(key);
  
      return value.replace(/\\n/g, '\n');
    }
    

  public getSaltRounds(): number {
      return this.getNumber('SALT_ROUNDS');
    }

  public getJwtSecret(): string {
          return this.getString('JWT_SECRET');

  }
  
  public getRefeshTokenExpiration(): number {
      return this.getNumber('REFRESH_TOKEN_EXP');
  }

  public getAccessTokenExpiration(): number {
      return this.getNumber('ACCESS_TOKEN_EXP');
  }

}