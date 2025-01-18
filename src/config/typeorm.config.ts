import { DataSource, DataSourceOptions } from 'typeorm';
import { EnvironmentKeyFactory } from '../shared/services/environment-key.factory';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
    envFilePath: '.env'
})

const configService = new ConfigService();
const environmentKeyFactory = new EnvironmentKeyFactory(configService);
const dataSourceOptions = environmentKeyFactory.getPostgresConfig() as DataSourceOptions;
export const AppDataSource = new DataSource(dataSourceOptions);
