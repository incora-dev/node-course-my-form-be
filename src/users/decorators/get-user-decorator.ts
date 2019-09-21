import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { User } from '../user.entity';

export const GetUser = createParamDecorator(
    (data, req): User => {
        if (!req.user) {
            throw new UnauthorizedException();
        }

        return req.user;
    },
);
