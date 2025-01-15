import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentKeyFactory } from '../shared/services/environment-key.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: EnvironmentKeyFactory) => 
        configService.getPostgresConfig(),
      inject: [EnvironmentKeyFactory],
    }),
  ],
})
export class DatabaseModule {}