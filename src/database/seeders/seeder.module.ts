import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';
import { UserSeederModule } from './users/usersSeeder.module';
import { Seeder } from './seeder';

/**
 * Import and provide seeder classes.
 */
@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UserSeederModule],
    providers: [Logger, Seeder],
})
export class SeederModule {}
