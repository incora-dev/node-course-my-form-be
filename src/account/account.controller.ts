import { Controller, Get, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { AccountService } from './account.service';
import { GetUser } from 'src/users/decorators/get-user-decorator';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    async getAccount(@GetUser() user: User): Promise<User> {
        return user;
    }
}
