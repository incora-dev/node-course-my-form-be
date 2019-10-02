import { IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Form } from '../../form.entity';
import { FieldPattern } from '../../fieldPatterns/fieldPattern.entity';
import { FieldType } from '../../fieldTypes/fieldType.entity';

export class SaveFormFieldDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    required?: boolean;

    @IsString()
    placeholder: string;

    @IsNotEmpty()
    pattern: FieldPattern;

    @IsNotEmpty()
    fieldType: FieldType;

    @IsNumber()
    form: Form;
}
