import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

import * as cookieParser from 'cookie-parser';
import * as packageJson from '../package.json';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      credentials: true,
    });

    app.use(cookieParser());

    const { version } = packageJson;

    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 3500;

    const getVersion = Math.floor(Number.parseInt(version, 10));

    app.setGlobalPrefix(`api/v${getVersion}`);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    setupSwagger(app);

    await app.listen(PORT, () =>
      Logger.log(`Service is running at: http://localhost:${PORT}`),
    );
  } catch (error) {
    Logger.error('Error starting server', error);
  }
}

bootstrap();
