import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    private logger = new Logger('UsersService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserByParams(params: GetUserDto): Promise<User> {
        if (!Object.keys(params).length) {
            throw new BadRequestException('Invalid parameters.');
        }

        const user = await this.userRepository.findOne(params);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.updateUser(id, updateUserDto);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentialsDto;

        const user = await this.userRepository
            .createQueryBuilder()
            .select('user')
            .addSelect('user.password')
            .from(User, 'user')
            .where('user.email = :email', { email })
            .getOne();

        if (!user) {
            return null;
        }

        const isSame = await this.userRepository.comparePasswords(password, user.password);

        if (user && isSame) {
            return user;
        } else {
            return null;
        }
    }
}
