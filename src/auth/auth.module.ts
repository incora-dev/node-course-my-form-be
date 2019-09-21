import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from '../config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig.secretKey,
            signOptions: {
                expiresIn: 86400, // 24 hours
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
