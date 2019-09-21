import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldTypesSeederService } from './fieldTypesSeeder.service';
import { FieldTypeRepository } from '../../../forms/fieldTypes/fieldType.repository';
import { FieldPatternRepository } from '../../../forms/fieldPatterns/fieldPattern.repository';

/**
 * Import and provide seeder classes for field types.
 */
@Module({
    imports: [TypeOrmModule.forFeature([FieldTypeRepository, FieldPatternRepository])],
    providers: [FieldTypesSeederService],
    exports: [FieldTypesSeederService],
})
export class FieldTypesSeederModule {}
