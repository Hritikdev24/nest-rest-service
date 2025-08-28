import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptio/all-exceptio.filter';
import { SuccessResponseInterceptor } from './all-response/all-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port=process.env.PORT ?? 3000
  const app = await NestFactory.create(AppModule);
  app.useLogger(false);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor() )

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Mongoose API')
    .setDescription('A RESTful API built with NestJS and Mongoose')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('user', 'User management endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(port);
  console.log("server runing on port:",port)
  console.log("Swagger documentation available at: http://localhost:" + port + "/api/docs");
}
bootstrap();
