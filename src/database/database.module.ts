import { DataSource } from 'typeorm';
import { Global, Module, Logger } from '@nestjs/common';
import { EnvironmentKeyFactory } from 'src/shared/services';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [EnvironmentKeyFactory],
      useFactory: async (envConfig: EnvironmentKeyFactory) => {
        const logger = new Logger('DatabaseConnection'); 
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: envConfig.getString('DB_HOST'),
            port: envConfig.getNumber('DB_PORT'),
            username: envConfig.getString('DB_USERNAME'),
            password: envConfig.getString('DB_PASSWORD'),
            database: envConfig.getString('DB_DATABASE'),
            logging: envConfig.getString('BUILD_MODE') == 'development',
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
            migrations: [`${__dirname}/migrations/**.{.ts,.js}`],
            synchronize: true
          });
          await dataSource.initialize();
          logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database', error.stack); 
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
