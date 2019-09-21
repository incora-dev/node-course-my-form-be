import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Form } from './form.entity';
import { FormDto } from './dto/form.dto';
import { SaveFormDto } from './dto/save-form.dto';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
    private logger = new Logger('FormRepository');

    async createForm(formDto: FormDto, user: User) {
        const saveFormDto: SaveFormDto = {
            ...formDto,
            owner: user,
            formCode: this.generateFormCode(),
        };

        const form = await this.save(saveFormDto);

        if (!form) {
            this.logger.error('Form not created: ' + saveFormDto);
            throw new InternalServerErrorException('Form not created.');
        }

        return form;
    }

    async getFormByUser(formId: number, userId: number, fullData: boolean = true): Promise<Form> {
        let form: Form;

        // get form with full data
        if (fullData) {
            form = await this.findOne(formId, {
                relations: ['fields', 'fields.pattern', 'fields.fieldType'],
                where: { owner: userId },
            });
        } else {
            form = await this.findOne(formId, {
                where: { owner: userId },
            });
        }

        if (!form) {
            throw new NotFoundException(`Form with ID "${formId}" not found.`);
        }

        return form;
    }

    generateFormCode(): string {
        return '<iframe></iframe>';
    }
}
