import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldTypesSeeds } from './data';
import { FieldType } from '../../../forms/fieldTypes/fieldType.entity';
import { FieldPattern } from '../../../forms/fieldPatterns/fieldPattern.entity';
import { FieldTypeRepository } from '../../../forms/fieldTypes/fieldType.repository';
import { FieldPatternRepository } from '../../../forms/fieldPatterns/fieldPattern.repository';
import { CreateFieldTypeDto } from '../../../forms/fieldTypes/dto/create-field-type.dto';
import { SeedFieldTypeDto } from './dto/seed-field-type.dto';

@Injectable()
export class FieldTypesSeederService {
    constructor(
        @InjectRepository(FieldTypeRepository)
        private readonly fieldTypeRepository: FieldTypeRepository,
        private readonly fieldPatternRepository: FieldPatternRepository,
    ) {}

    /**
     * Seed all field types (with patterns).
     */
    create(): Array<Promise<FieldType>> {
        return FieldTypesSeeds.map(async (fieldType: SeedFieldTypeDto) => {
            const fieldTypesExist = await this.fieldTypeRepository.findOne({
                type: fieldType.type,
            });

            if (fieldTypesExist) {
                return null;
            }

            const createFieldType: CreateFieldTypeDto = {
                type: fieldType.type,
                formControl: fieldType.formControl,
            };

            // get patterns for field type
            if (fieldType.patterns) {
                createFieldType.patterns = await this.fieldPatternRepository.find({
                    name: In(fieldType.patterns),
                });
            }

            return await this.fieldTypeRepository.save(createFieldType);
        });
    }
}
