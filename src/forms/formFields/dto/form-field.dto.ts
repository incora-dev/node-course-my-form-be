import { IsString, IsNumber } from 'class-validator';

export class FormFieldDto {
    @IsString()
    placeholder: string;

    @IsNumber()
    pattern: number;

    @IsNumber()
    fieldType: number;
}
