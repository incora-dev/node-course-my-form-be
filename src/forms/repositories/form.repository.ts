import { Repository, EntityRepository } from 'typeorm';
import { Form } from '../entities/form.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
    async getFormByUser(formId: number, userId: number): Promise<Form> {
        const form = await this.findOne(formId, {
            where: { owner: userId },
        });

        if (!form) {
            throw new NotFoundException(`Form with ID "${formId}" not found`);
        }

        return form;
    }

    generateFormCode(): string {
        return '<iframe></iframe>';
    }
}
