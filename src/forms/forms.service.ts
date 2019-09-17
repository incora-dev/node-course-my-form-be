import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { User } from '../users/user.entity';
import { FormDto } from './dto/form.dto';
import { FormRepository } from './form.repository';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(FormRepository)
        private formRepository: FormRepository,
    ) {}

    async createForm(formDto: FormDto, user: User): Promise<Form> {
        const createFormDto: CreateFormDto = {
            ...formDto,
            owner: user,
            formCode: this.formRepository.generateFormCode(),
        };

        return await this.formRepository.save(createFormDto);
    }

    async getUserForms(userId: number): Promise<Form[]> {
        return await this.formRepository.find({
            where: { owner: userId },
        });
    }

    async getUserForm(formId: number, userId: number): Promise<Form> {
        return await this.formRepository.getFormByUser(formId, userId);
    }

    async updateForm(formId: number, updateFormDto: UpdateFormDto, userId: number): Promise<Form> {
        const form = await this.formRepository.getFormByUser(formId, userId);
        const saveFormDto: CreateFormDto = {
            ...updateFormDto,
            formCode: this.formRepository.generateFormCode(),
        };

        const isUpdated = await this.formRepository.update({ id: form.id }, saveFormDto);

        if (!isUpdated) {
            throw new InternalServerErrorException('User not updated');
        }

        return await this.formRepository.findOne(form.id);
    }

    async deleteForm(formId: number, user: User): Promise<void> {
        const result = await this.formRepository.delete({ id: formId, owner: user });

        if (result.affected === 0) {
            throw new NotFoundException(`Form with ID "${formId}" not found`);
        }
    }
}
