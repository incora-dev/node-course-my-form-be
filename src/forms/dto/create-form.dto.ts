import { FormDto } from './form.dto';
import { User } from '../../users/user.entity';

export class CreateFormDto extends FormDto {
    formCode: string;
    owner: User;
}
