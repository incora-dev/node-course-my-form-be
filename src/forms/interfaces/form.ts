import { IFormField } from './form-field';
import { User } from '../../users/user.entity';

export interface IForm {
    name: string;
    fields: IFormField[];
    formCode: string;
    background: string;
    owner: User;
}
