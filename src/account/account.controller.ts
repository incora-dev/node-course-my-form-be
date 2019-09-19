import { Controller, Get, Put, Delete, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { AccountService } from './account.service';
import { GetUser } from '../users/decorators/get-user-decorator';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

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
        return await this.accountService.updateAccount(user, updateUserDto);
    }

    @Delete()
    async deleteAccount(@GetUser() user: User): Promise<void> {
        return await this.accountService.deleteAccount(user);
    }
}
