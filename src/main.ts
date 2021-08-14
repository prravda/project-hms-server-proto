import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const apiDocumentConfig = new DocumentBuilder()
    .setTitle('project:hms')
    .setDescription('prototype server api document')
    .setVersion('proto')
    .build();

  const apiDocument = SwaggerModule.createDocument(app, apiDocumentConfig);
  SwaggerModule.setup('api', app, apiDocument);

  await app.listen(3000);
}
bootstrap();
