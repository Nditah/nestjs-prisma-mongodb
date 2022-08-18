import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { urlencoded, json } from 'express';
import { AppModule } from './app.module';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './configs/config.interface';
import { useRequestLoggingMiddleware, rawBodyMiddleware } from './middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To Allow Base64String if error "request body too large"
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(rawBodyMiddleware());

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Logging
  useRequestLoggingMiddleware(app);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Assignment API')
      .setDescription(swaggerConfig.description || 'MEARN Assignment API Doc')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }
  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(process.env.PORT || nestConfig.port || 5000);
}

bootstrap();
