import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldPatternRepository } from './fieldPattern.repository';
import { FieldPattern } from './fieldPattern.entity';

@Injectable()
export class FieldPatternsService {
    constructor(
        @InjectRepository(FieldPatternRepository)
        private readonly fieldPatternRepository: FieldPatternRepository,
    ) {}

    async getFieldPatternByParams(params): Promise<FieldPattern> {
        const fieldPattern = await this.fieldPatternRepository.findOne(params);

        if (!fieldPattern) {
            throw new NotFoundException('Field pattern not found.');
        }

        return fieldPattern;
    }
}
