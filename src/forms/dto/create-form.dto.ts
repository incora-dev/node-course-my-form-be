import { IFormField } from '../interfaces/form-field';
import { IForm } from '../interfaces/form';
import { User } from '../../users/user.entity';

export class CreateFormDto implements IForm {
    readonly formCode: string;
    readonly name: string;
    readonly background: string;
    readonly fields: Array<IFormField>;
    readonly owner: User;
}
