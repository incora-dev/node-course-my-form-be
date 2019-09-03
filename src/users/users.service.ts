import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserByParams(params: GetUserDto): Promise<User> {
        const user = await this.userRepository.findOne(params);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const isUpdated = await this.userRepository.update({ id }, updateUserDto);

        if (!isUpdated) {
            throw new InternalServerErrorException('User not updated');
        }

        return await this.userRepository.findOne(id);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete({ id });

        if (result.affected === 0) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;

        const user = await this.userRepository
            .createQueryBuilder()
            .select('user')
            .addSelect('user.password')
            .from(User, 'user')
            .where('user.username = :username', { username })
            .getOne();

        if (user && (await bcrypt.compare(password, user.password))) {
            return user.username;
        } else {
            return null;
        }
    }
}
