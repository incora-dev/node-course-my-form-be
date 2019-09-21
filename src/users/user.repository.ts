import {
    ConflictException,
    InternalServerErrorException,
    Logger,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
                throw new InternalServerErrorException('Failed to create user.');
            }
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        if (!Object.keys(updateUserDto).length) {
            throw new BadRequestException('At least one parameter needs to be updated');
        }

        try {
            if (updateUserDto.password) {
                updateUserDto.password = await this.hashPassword(updateUserDto.password);
            }

            const isUpdated = await this.update({ id }, updateUserDto);

            if (!isUpdated) {
                throw new Error();
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
                throw new InternalServerErrorException('Failed to update user.');
            }
        }
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        const user = await this.createQueryBuilder()
            .select('user')
            .addSelect('user.password')
            .from(User, 'user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const isSame = await this.comparePasswords(changePasswordDto.oldPassword, user.password);

        if (!isSame) {
            throw new BadRequestException('Passwords not the same.');
        }

        // hash password
        changePasswordDto.newPassword = await this.hashPassword(changePasswordDto.newPassword);

        const isUpdated = await this.update(
            { id },
            {
                password: changePasswordDto.newPassword,
            },
        );

        if (!isUpdated) {
            this.logger.error(
                `Failed to change password for user with ID "${id}", Data: ${JSON.stringify(
                    changePasswordDto,
                )}`,
            );
            throw new InternalServerErrorException('Password not updated.');
        }
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found.`);
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
