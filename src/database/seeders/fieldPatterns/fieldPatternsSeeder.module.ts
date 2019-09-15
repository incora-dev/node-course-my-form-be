import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPatternsSeederService } from './fieldPatternsSeeder.service';
import { FieldPatternRepository } from '../../../forms/repositories/fieldPattern.repository';

/**
 * Import and provide seeder classes for users.
 */
@Module({
    imports: [TypeOrmModule.forFeature([FieldPatternRepository])],
    providers: [FieldPatternsSeederService],
    exports: [FieldPatternsSeederService],
})
export class FieldPatternsSeederModule {}
