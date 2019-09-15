import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldPatternRepository } from './fieldPattern.repository';

@Injectable()
export class FieldPatternsSeederService {
    constructor(
        @InjectRepository(FieldPatternRepository)
        private readonly fieldPatternRepository: FieldPatternRepository,
    ) {}
}
