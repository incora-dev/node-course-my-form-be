import {
    Injectable,
    BadRequestException,
    Logger,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormFieldRepository } from './formField.repository';
import { CreateFormFieldDto } from './dto/create-form-field.dto';
import { FormField } from './formField.entity';
import { Form } from '../form.entity';
import { FormFieldDto } from './dto/form-field.dto';
import { FieldTypesService } from '../fieldTypes/fieldTypes.service';
import { FieldPatternsService } from '../fieldPatterns/fieldPatterns.service';
import { SaveFormFieldDto } from './dto/save-form-field.dto';

@Injectable()
export class FormFieldService {
    private logger = new Logger('FormFieldService');

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
        const fieldPattern = await this.fieldPatternsService.getFieldPatternByParams(
            formFieldDto.pattern,
        );

        if (!fieldType || !fieldPattern) {
            throw new BadRequestException();
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
            throw new InternalServerErrorException();
        }

        return formField;
    }
}
