import { ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, role } = createUserDto;

        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.password = await bcrypt.hash(password, salt);
        user.role = role;

        try {
            await user.save();

            delete user.password;
            return user;
        } catch (err) {
            if (err.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                this.logger.error(
                    `Failed to create user, Data: ${JSON.stringify(createUserDto)}`,
                    err.stack,
                );
                throw new InternalServerErrorException();
            }
        }
    }
}
