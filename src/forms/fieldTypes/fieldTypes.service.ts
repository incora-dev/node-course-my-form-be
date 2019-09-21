import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldTypeRepository } from './fieldType.repository';
import { FieldType } from './fieldType.entity';

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

    async getFieldTypeByParams(params): Promise<FieldType> {
        const fieldType = await this.fieldTypeRepository.findOne(params);

        if (!fieldType) {
            throw new NotFoundException('Field type not found.');
        }

        return fieldType;
    }
}
