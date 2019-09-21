import { IsString } from 'class-validator';

export class FormDto {
    @IsString()
    name: string;

    @IsString()
    background: string;
}
