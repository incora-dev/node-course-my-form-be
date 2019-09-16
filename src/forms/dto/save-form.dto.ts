import { FormDto } from './form.dto';
import { User } from '../../users/user.entity';
import { IsString } from 'class-validator';

export class SaveFormDto extends FormDto {
    @IsString()
    formCode: string;

    // TODO
    owner: User;
}
