import { FormDto } from './form.dto';
import { FormFieldDto } from '../formFields/dto/form-field.dto';
import { IsArray } from 'class-validator';

export class CreateFormDto extends FormDto {
    @IsArray()
    fields: FormFieldDto[];
}
