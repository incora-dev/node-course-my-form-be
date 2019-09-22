import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { User } from '../users/user.entity';
import { Feedback } from '../feedbacks/feedback.entity';
import { FormRepository } from './form.repository';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { SaveFormDto } from './dto/save-form.dto';
import { FormFieldsService } from './formFields/formFields.service';

@Injectable()
export class FormsService {
    private logger = new Logger('FormsService');

    constructor(
        @InjectRepository(FormRepository)
        private formRepository: FormRepository,
        private formFieldsService: FormFieldsService,
    ) {}

    async createForm(createFormDto: CreateFormDto, user: User): Promise<Form> {
        const formFieldsDto = createFormDto.fields;
        delete createFormDto.fields;

        const form = await this.formRepository.createForm(createFormDto, user);

        // create form fields
        const formFields = await this.formFieldsService.createFormFields(formFieldsDto, form);

        // return form with all data
        return await this.formRepository.getFormByUser(form.id, user.id);
    }

    async getUserForms(userId: number): Promise<Form[]> {
        return await this.formRepository.find({
            where: { owner: userId },
        });
    }

    async getUserForm(formId: number, userId: number): Promise<Form> {
        return await this.formRepository.getFormByUser(formId, userId);
    }

    async updateForm(formId: number, updateFormDto: UpdateFormDto, user: User): Promise<Form> {
        const formFieldsDto = updateFormDto.fields;
        if (formFieldsDto) {
            delete updateFormDto.fields;
        }

        // get form data
        const form = await this.formRepository.getFormByUser(formId, user.id, false);

        const saveFormDto: SaveFormDto = {
            ...updateFormDto,
            owner: user,
            formCode: this.formRepository.generateFormCode(),
        };

        // update form info
        const isFormUpdated = await this.formRepository.update({ id: form.id }, saveFormDto);

        // update form fields
        if (formFieldsDto) {
            // delete old fields
            await this.formFieldsService.deleteFormFields(form);

            // create new fields
            const formFields = await this.formFieldsService.createFormFields(formFieldsDto, form);
        }

        if (!isFormUpdated) {
            throw new InternalServerErrorException('Form not updated.');
        }

        // return form with all data
        return await this.formRepository.getFormByUser(form.id, user.id);
    }

    async deleteForm(formId: number, user: User): Promise<void> {
        const result = await this.formRepository.delete({ id: formId, owner: user });

        if (result.affected === 0) {
            throw new NotFoundException(`Form with ID "${formId}" not found.`);
        }
    }

    async getFormFeedbacks(formId: number, user: User): Promise<Feedback[]> {
        const form: Form = await this.formRepository.findOne(formId, {
            where: { owner: user.id },
            relations: ['feedbacks'],
        });

        if (!form) {
            throw new NotFoundException(`Form with ID "${formId}" not found.`);
        }

        return form.feedbacks;
    }
}
