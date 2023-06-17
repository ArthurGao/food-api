import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Create a Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Food API')
    .setDescription('API for managing food')
    .setVersion('1.0')
    .build();

  // Generate the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document);

  // Start the application
  await app.listen(3000);
}
bootstrap();
