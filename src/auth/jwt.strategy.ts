import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload-interface';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secretKey,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.usersService.getUserByParams({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
