import { FormDto } from './form.dto';
import { IsOptional, IsArray } from 'class-validator';
import { FormFieldDto } from '../formFields/dto/form-field.dto';

export class UpdateFormDto extends FormDto {
    @IsOptional()
    name: string;

    @IsOptional()
    background: string;

    @IsOptional()
    @IsArray()
    fields: FormFieldDto[];
}
