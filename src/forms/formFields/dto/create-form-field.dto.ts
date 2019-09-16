import { FormFieldDto } from './form-field.dto';
import { Form } from 'src/forms/form.entity';

export class CreateFormFieldDto extends FormFieldDto {
    form: Form;
}
