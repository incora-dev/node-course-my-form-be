import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    // All
    const options = new DocumentBuilder()
        .setTitle('Form builder')
        .setDescription('Form builder API description')
        .setVersion('1.0')
        .addTag('form-builder')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Users
    const usersOptions = new DocumentBuilder()
        .setTitle('Form builder users')
        .setDescription('Form builder users API description')
        .setVersion('1.0')
        .addTag('users')
        .addBearerAuth()
        .build();
    const usersDocument = SwaggerModule.createDocument(app, usersOptions, {
        include: [UsersModule],
    });
    SwaggerModule.setup('api/users', app, usersDocument);

    const port = 3000;
    await app.listen(port);

    logger.log(`Application listening on port ${port}`);
}
bootstrap();
