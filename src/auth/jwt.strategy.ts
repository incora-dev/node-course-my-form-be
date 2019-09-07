import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload-interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { jwtConfig } from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secretKey,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user = await this.usersService.getUserByParams({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
