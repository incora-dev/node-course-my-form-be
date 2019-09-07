import {
    ConflictException,
    InternalServerErrorException,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            createUserDto.password = await this.hashPassword(createUserDto.password);

            const user = await this.save(createUserDto);
            delete user.password;

            return user;
        } catch (err) {
            if (err.code === '23505') {
                // duplicate email
                throw new ConflictException('This email already exists');
            } else {
                this.logger.error(
                    `Failed to create user, Data: ${JSON.stringify(createUserDto)}`,
                    err.stack,
                );
                throw new InternalServerErrorException();
            }
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            if (!Object.keys(updateUserDto).length) {
                throw new BadRequestException();
            }

            if (updateUserDto.password) {
                updateUserDto.password = await this.hashPassword(updateUserDto.password);
            }

            const isUpdated = await this.update({ id }, updateUserDto);

            if (!isUpdated) {
                throw new InternalServerErrorException('User not updated');
            }

            return await this.findOne(id);
        } catch (err) {
            if (err.code === '23505') {
                // duplicate email
                throw new ConflictException('This email already exists');
            } else {
                this.logger.error(
                    `Failed to update user, Data: ${JSON.stringify(updateUserDto)}`,
                    err.stack,
                );
                throw new InternalServerErrorException();
            }
        }
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}
