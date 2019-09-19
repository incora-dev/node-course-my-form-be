import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AccountService {
    constructor(private usersService: UsersService) {}

    async updateAccount(user: User, updateUserDto: UpdateUserDto): Promise<User> {
        // user role cannot be changed
        if (updateUserDto.role) {
            delete updateUserDto.role;
        }

        return await this.usersService.updateUser(user.id, updateUserDto);
    }

    async deleteAccount(user: User): Promise<void> {
        return await this.usersService.deleteUser(user.id);
    }
}
