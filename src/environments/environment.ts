import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { IEnvironment } from './i.environment';

export const environment: IEnvironment = {
  production: false,
  dbHost: 'localhost',
  dbPort: 5432,
  dbName: 'nest',
  dbUsername: 'root',
  dbPassword: 'secret',
  logging: true,
};
