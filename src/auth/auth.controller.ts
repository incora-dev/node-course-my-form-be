import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import {
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';

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
    signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.signUp(createUserDto);
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
