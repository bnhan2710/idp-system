import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isBooleanString } from 'class-validator';
import { join } from 'path';


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

  public getBoolean(key: string): boolean {
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
          return this.getString('JWT_SECRET')
  }
  
  public getRefeshTokenExpiration(): number {
      return this.getNumber('REFRESH_TOKEN_EXP');
  }

  public getAccessTokenExpiration(): number {
      return this.getNumber('ACCESS_TOKEN_EXP');
  }

 public getPostgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getString('DB_HOST'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      port: this.getNumber('DB_PORT'),
      database: this.getString('DB_DATABASE'),
      synchronize: this.getBoolean('DB_SYNC'),
      entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
      // logging: this.configService.get('BUILD_MODE') === 'development',
      logging: false
      // migrationsRun: true,
    };
  }

}
 