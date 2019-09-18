import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/user.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([UserRepository])],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}
