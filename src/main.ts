import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    // All Documentation
    const options = new DocumentBuilder()
        .setTitle('Form builder')
        .setDescription('Form builder API description')
        .setVersion('1.0')
        .addTag('form-builder')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Auth
    const authOptions = new DocumentBuilder()
        .setTitle('Form builder auth')
        .setDescription('Form builder auth API description')
        .setVersion('1.0')
        .addTag('auth')
        .addBearerAuth()
        .build();
    const authDocument = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule],
    });
    SwaggerModule.setup('api/auth', app, authDocument);

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
