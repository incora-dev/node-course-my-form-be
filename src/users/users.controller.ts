import { Controller, Get, Post, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiUseTags,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiImplicitParam,
    ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: User,
    })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    @ApiOkResponse({ description: 'The users have been successfully selected.', type: [User] })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiOkResponse({ description: 'The user has been successfully selected.', type: User })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Not found.' })
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.usersService.getUserByParams({ id });
    }

    @Put('/:id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiOkResponse({ description: 'The user has been successfully updated.', type: User })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiNotFoundResponse({ description: 'Not found.' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiOkResponse({ description: 'The user has been successfully deleted.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiNotFoundResponse({ description: 'Not found.' })
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async deleteUser(@Param('id') id: number): Promise<void> {
        return await this.usersService.deleteUser(id);
    }
}
