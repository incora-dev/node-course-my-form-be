import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Form } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
    ) {}

    async create(createFormDto: CreateFormDto): Promise<Form> {
        return await this.formRepository.save(createFormDto);
    }

    async getAll(id: number): Promise<Form[]> {
        return await this.formRepository.find({
            relations: ['owner'],
            where: { owner: { id } },
        });
    }

    async getOne(id: number): Promise<Form> {
        return await this.formRepository.findOne(id, { relations: ['owner'] });
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.formRepository.delete(id);
    }
}
