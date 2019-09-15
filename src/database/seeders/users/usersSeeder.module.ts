import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeederService } from './usersSeeder.service';
import { UserRepository } from '../../../users/user.repository';

/**
 * Import and provide seeder classes for users.
 */
@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [UserSeederService],
    exports: [UserSeederService],
})
export class UserSeederModule {}
