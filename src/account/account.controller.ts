import { Controller, Get, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { AccountService } from './account.service';
import { GetUser } from 'src/users/decorators/get-user-decorator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
    constructor(private accountService: AccountService, private usersService: UsersService) {}

    @Get()
    async getAccount(@GetUser() user: User): Promise<User> {
        return user;
    }

    @Put()
    async updateAccount(
        @Body() updateUserDto: UpdateUserDto,
        @GetUser() user: User,
    ): Promise<User> {
        return await this.usersService.updateUser(user.id, updateUserDto);
    }

    @Delete()
    async deleteUser(@GetUser() user: User): Promise<void> {
        return await this.usersService.deleteUser(user.id);
    }
}
