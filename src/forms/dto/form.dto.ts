import { IsString, IsNotEmpty } from 'class-validator';

export class FormDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    background: string;
}
