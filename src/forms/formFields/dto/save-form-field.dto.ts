import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Form } from '../../form.entity';
import { FieldPattern } from '../../fieldPatterns/fieldPattern.entity';
import { FieldType } from '../../fieldTypes/fieldType.entity';

export class SaveFormFieldDto {
    @IsString()
    placeholder: string;

    @IsNotEmpty()
    pattern: FieldPattern;

    @IsNotEmpty()
    fieldType: FieldType;

    @IsNumber()
    form: Form;
}
