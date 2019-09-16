import { IsNumber, IsString } from 'class-validator';
import { Form } from 'src/forms/form.entity';
import { FieldPattern } from 'src/forms/fieldPatterns/fieldPattern.entity';
import { FieldType } from 'src/forms/fieldTypes/fieldType.entity';

export class SaveFormFieldDto {
    @IsString()
    placeholder: string;

    // TODO
    pattern: FieldPattern;

    // TODO
    fieldType: FieldType;

    @IsNumber()
    form: Form;
}
