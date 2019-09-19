import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { UserRole } from '../users/enums/user-role.enum';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(userDto: UserDto): Promise<User> {
        const createUserDto: CreateUserDto = {
            ...userDto,
            role: UserRole.USER,
        };

        return await this.usersService.createUser(createUserDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.validateUserPassword(authCredentialsDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { id: user.id };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

        return { accessToken };
    }
}
