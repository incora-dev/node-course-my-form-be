import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldPatternsSeeds } from './data';
import { FieldPattern } from '../../../forms/entities/fieldPattern.entity';
import { FieldPatternRepository } from '../../../forms/repositories/fieldPattern.repository';

/**
 * Service dealing with fieldPattern based operations.
 */
@Injectable()
export class FieldPatternsSeederService {
    /**
     * Create an instance of class.
     */
    constructor(
        @InjectRepository(FieldPatternRepository)
        private readonly fieldPatternRepository: FieldPatternRepository,
    ) {}

    /**
     * Seed all field patterns.
     */
    create(): Array<Promise<FieldPattern>> {
        return FieldPatternsSeeds.map(async pattern => {
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
