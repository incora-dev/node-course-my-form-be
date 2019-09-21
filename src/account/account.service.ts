import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async updateAccount(user: User, updateAccountDto: UpdateAccountDto): Promise<User> {
        return await this.userRepository.updateUser(user.id, updateAccountDto);
    }

    async changeAccountPassword(user: User, changePasswordDto: ChangePasswordDto): Promise<void> {
        return await this.userRepository.changePassword(user.id, changePasswordDto);
    }

    async deleteAccount(user: User): Promise<void> {
        return await this.userRepository.deleteUser(user.id);
    }
}
