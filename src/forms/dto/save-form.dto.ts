import { FormDto } from './form.dto';
import { User } from '../../users/user.entity';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SaveFormDto extends FormDto {
    @IsOptional()
    @IsString()
    formCode?: string;

    @IsNotEmpty()
    owner: User;
}
