import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import {
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ApiCreatedResponse({
        description: 'The user has been successfully created.',
        type: User,
    })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiResponse({
        status: 409,
        description: 'This email already exists',
    })
    signUp(@Body() userDto: UserDto): Promise<User> {
        return this.authService.signUp(userDto);
    }

    @Post('/signin')
    @ApiCreatedResponse({
        description: 'The user has been successfully authorized.',
    })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized. Invalid credentials.' })
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}
