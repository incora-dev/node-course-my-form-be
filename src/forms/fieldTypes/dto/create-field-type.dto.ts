import { FieldTypeDto } from './field-type.dto';
import { FieldPattern } from '../../../forms/fieldPatterns/fieldPattern.entity';
import { IsArray } from 'class-validator';

export class CreateFieldTypeDto extends FieldTypeDto {
    @IsArray()
    patterns?: FieldPattern[];
}
