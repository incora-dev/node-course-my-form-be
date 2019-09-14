import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { User } from '../users/user.entity';
import { FormDto } from './dto/form.dto';
import { FormRepository } from './form.repository';

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(FormRepository)
        private readonly formRepository: FormRepository,
    ) {}

    async create(formDto: FormDto, user: User): Promise<Form> {
        const createFormDto: CreateFormDto = {
            ...formDto,
            owner: user,
            formCode: '<iframe></iframe>',
        };

        return await this.formRepository.save(createFormDto);
    }

    async getUserForms(userId: number): Promise<Form[]> {
        return await this.formRepository.find({
            where: { owner: userId },
        });
    }

    async getUserForm(formId: number, userId: number): Promise<Form> {
        const form = await this.formRepository.findOne(formId, {
            where: { owner: userId },
        });

        if (!form) {
            throw new NotFoundException(`Form with ID "${formId}" not found`);
        }

        return form;
    }

    async delete(formId: number, user: User): Promise<void> {
        const result = await this.formRepository.delete({ id: formId, owner: user });

        if (result.affected === 0) {
            throw new NotFoundException(`Form with ID "${formId}" not found`);
        }
    }
}
