import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptio/all-exceptio.filter';
import { SuccessResponseInterceptor } from './all-response/all-response.interceptor';
async function bootstrap() {
  const port=process.env.PORT ?? 3000
  const app = await NestFactory.create(AppModule);
  app.useLogger(false);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor() )
  await app.listen(port);
  console.log("server runing on port:",port)
}
bootstrap();
