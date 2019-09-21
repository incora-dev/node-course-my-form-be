import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldPatternsSeeds } from './data';
import { FieldPattern } from '../../../forms/fieldPatterns/fieldPattern.entity';
import { FieldPatternRepository } from '../../../forms/fieldPatterns/fieldPattern.repository';
import { FieldPatternDto } from '../../../forms/fieldPatterns/dto/field-pattern.dto';

@Injectable()
export class FieldPatternsSeederService {
    constructor(
        @InjectRepository(FieldPatternRepository)
        private readonly fieldPatternRepository: FieldPatternRepository,
    ) {}

    /**
     * Seed all field patterns.
     */
    create(): Array<Promise<FieldPattern>> {
        return FieldPatternsSeeds.map(async (pattern: FieldPatternDto) => {
            const fieldPatternExist = await this.fieldPatternRepository.findOne({
                name: pattern.name,
            });

            if (fieldPatternExist) {
                return null;
            }

            return await this.fieldPatternRepository.save(pattern);
        });
    }
}
