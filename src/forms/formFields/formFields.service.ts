import {
    Injectable,
    BadRequestException,
    Logger,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../form.entity';
import { FormField } from './formField.entity';
import { FormFieldRepository } from './formField.repository';
import { FormFieldDto } from './dto/form-field.dto';
import { SaveFormFieldDto } from './dto/save-form-field.dto';
import { FieldTypesService } from '../fieldTypes/fieldTypes.service';
import { FieldPatternsService } from '../fieldPatterns/fieldPatterns.service';

@Injectable()
export class FormFieldsService {
    private logger = new Logger('FormFieldsService');

    constructor(
        @InjectRepository(FormFieldRepository)
        private readonly formFieldRepository: FormFieldRepository,
        private fieldTypesService: FieldTypesService,
        private fieldPatternsService: FieldPatternsService,
    ) {}

    async createFormFields(formFieldsDto: FormFieldDto[], form: Form): Promise<FormField[]> {
        const createdFields = [];

        for (const fieldDto of formFieldsDto) {
            createdFields.push(await this.createFormField(fieldDto, form));
        }

        return createdFields;
    }

    async createFormField(formFieldDto: FormFieldDto, form: Form): Promise<FormField> {
        const fieldType = await this.fieldTypesService.getFieldTypeByParams(formFieldDto.fieldType);

        let fieldPattern = null;
        if (formFieldDto.pattern) {
            fieldPattern = await this.fieldPatternsService.getFieldPatternById(
                formFieldDto.pattern,
            );
        }

        if (!fieldType) {
            throw new BadRequestException('Invalid parameters.');
        }

        const saveFormFieldDto: SaveFormFieldDto = {
            placeholder: formFieldDto.placeholder,
            pattern: fieldPattern,
            fieldType,
            form,
        };

        const formField = await this.formFieldRepository.save(saveFormFieldDto);

        if (!formField) {
            this.logger.error('Form field not created: ' + saveFormFieldDto);
            throw new InternalServerErrorException('Form field not created.');
        }

        return formField;
    }

    async getFormFieldById(id: number): Promise<FormField> {
        const formField: FormField = await this.formFieldRepository.findOne({ id });

        if (!formField) {
            throw new NotFoundException(`Form field with ID "${id}" not found.`);
        }

        return formField;
    }

    async deleteFormFields(form: Form) {
        return await this.formFieldRepository.delete({ form });
    }
}
