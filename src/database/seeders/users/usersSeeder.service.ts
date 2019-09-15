import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersSeeds } from './data';
import { User } from '../../../users/user.entity';
import { UserRepository } from '../../../users/user.repository';
import { CreateUserDto } from '../../../users/dto/create-user.dto';

/**
 * Service dealing with user based operations.
 */
@Injectable()
export class UserSeederService {
    /**
     * Create an instance of class.
     */
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    /**
     * Seed all users.
     */
    create(): Array<Promise<User>> {
        return UsersSeeds.map(async (user: CreateUserDto) => {
            const userExist = await this.userRepository.findOne({ email: user.email });

            if (userExist) {
                return null;
            }

            return await this.userRepository.createUser(user);
        });
    }
}
