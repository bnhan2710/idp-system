import { DataSource, DataSourceOptions } from 'typeorm';
import { EnvironmentKeyFactory } from '../shared/services/environment-key.factory';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const environmentKeyFactory = new EnvironmentKeyFactory(configService);
const dataSourceOptions = environmentKeyFactory.getPostgresConfig() as DataSourceOptions;
export const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;