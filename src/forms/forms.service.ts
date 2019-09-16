import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { User } from '../users/user.entity';
import { FormRepository } from './form.repository';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { SaveFormDto } from './dto/save-form.dto';
import { FormFieldService } from './formFields/formFields.service';
import { formatWithOptions } from 'util';

@Injectable()
export class FormsService {
    private logger = new Logger('FormsService');

    constructor(
        @InjectRepository(FormRepository)
        private formRepository: FormRepository,
        private formFieldService: FormFieldService,
    ) {}

    async createForm(createFormDto: CreateFormDto, user: User): Promise<Form> {
        const formFieldsDto = createFormDto.fields;
        delete createFormDto.fields;

        const form = await this.formRepository.createForm(createFormDto, user);

        // create form fields
        const formFields = await this.formFieldService.createFormFields(formFieldsDto, form);

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

    // TODO
    // async updateForm(formId: number, updateFormDto: UpdateFormDto, userId: number): Promise<Form> {
    async updateForm(formId: number, updateFormDto: UpdateFormDto, userId: number) {
        // TODO
        // const form = await this.formRepository.getFormByUser(formId, userId);
        // const saveFormDto: SaveFormDto = {
        //     ...updateFormDto,
        //     formCode: this.formRepository.generateFormCode(),
        // };
        // const isUpdated = await this.formRepository.update({ id: form.id }, saveFormDto);
        // if (!isUpdated) {
        //     throw new InternalServerErrorException('User not updated');
        // }
        // return await this.formRepository.findOne(form.id);
    }

    async deleteForm(formId: number, user: User): Promise<void> {
        const result = await this.formRepository.delete({ id: formId, owner: user });

        if (result.affected === 0) {
            throw new NotFoundException(`Form with ID "${formId}" not found`);
        }
    }
}
