import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldTypeRepository } from './fieldType.repository';

@Injectable()
export class FieldTypesSeederService {
    constructor(
        @InjectRepository(FieldTypeRepository)
        private readonly fieldTypeRepository: FieldTypeRepository,
    ) {}
}
