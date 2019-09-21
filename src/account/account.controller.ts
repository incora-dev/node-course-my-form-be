import { Controller, Get, Put, Delete, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from '../users/decorators/get-user-decorator';
import { AccountService } from './account.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    async getAccount(@GetUser() user: User): Promise<User> {
        return user;
    }

    @Put()
    async updateAccount(
        @Body() updateAccountDto: UpdateAccountDto,
        @GetUser() user: User,
    ): Promise<User> {
        return await this.accountService.updateAccount(user, updateAccountDto);
    }

    @Post('change-password')
    async changeAccountPassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @GetUser() user: User,
    ): Promise<void> {
        return await this.accountService.changeAccountPassword(user, changePasswordDto);
    }

    @Delete()
    async deleteAccount(@GetUser() user: User): Promise<void> {
        return await this.accountService.deleteAccount(user);
    }
}
