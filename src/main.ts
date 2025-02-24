import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'http://localhost:5173',
  // });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  const port = process.env.PORT ?? 3000;
  console.log('application running on port', port);
  await app.listen(port);
}
bootstrap();
