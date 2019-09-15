import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';
import { Seeder } from './seeder';
import { UserSeederModule } from './users/usersSeeder.module';
import { FieldPatternsSeederModule } from './fieldPatterns/fieldPatternsSeeder.module';

/**
 * Import and provide seeder classes.
 */
@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UserSeederModule, FieldPatternsSeederModule],
    providers: [Logger, Seeder],
})
export class SeederModule {}
