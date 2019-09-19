import { FormFieldDto } from './form-field.dto';
import { Form } from '../../form.entity';

export class CreateFormFieldDto extends FormFieldDto {
    form: Form;
}
