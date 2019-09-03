import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Put,
    UsePipes,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.usersService.getUserByParams({ id });
    }

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}
