import { FieldTypeDto } from './field-type.dto';
import { FieldPattern } from '../../../forms/fieldPatterns/fieldPattern.entity';

export class CreateFieldTypeDto extends FieldTypeDto {
    patterns?: FieldPattern[];
}
