import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPatternsSeederService } from './fieldPatternsSeeder.service';
import { FieldPatternRepository } from '../../../forms/fieldPatterns/fieldPattern.repository';

/**
 * Import and provide seeder classes for field patterns.
 */
@Module({
    imports: [TypeOrmModule.forFeature([FieldPatternRepository])],
    providers: [FieldPatternsSeederService],
    exports: [FieldPatternsSeederService],
})
export class FieldPatternsSeederModule {}
