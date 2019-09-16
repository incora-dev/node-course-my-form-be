import { FormDto } from './form.dto';
import { User } from '../../users/user.entity';

export class UpdateFormDto extends FormDto {
    // TODO
    owner: User;
}
