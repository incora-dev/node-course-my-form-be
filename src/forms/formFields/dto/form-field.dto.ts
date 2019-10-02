import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class FormFieldDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsBoolean()
    required?: boolean;

    @IsString()
    placeholder: string;

    @IsNumber()
    pattern: number;

    @IsNumber()
    fieldType: number;
}
