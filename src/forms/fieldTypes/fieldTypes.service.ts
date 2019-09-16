import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldTypeRepository } from './fieldType.repository';

@Injectable()
export class FieldTypesService {
    constructor(
        @InjectRepository(FieldTypeRepository)
        private readonly fieldTypeRepository: FieldTypeRepository,
    ) {}

    async getFieldTypes(withPatterns: boolean = true) {
        if (withPatterns) {
            return await this.fieldTypeRepository.find({ relations: ['patterns'] });
        }
        return await this.fieldTypeRepository.find();
    }

    async getFieldType(typeId: number) {
        const fieldType = await this.fieldTypeRepository.findOne(typeId);

        if (!fieldType) {
            throw new NotFoundException(`Field type with ID "${typeId}" not found`);
        }

        return fieldType;
    }
}
