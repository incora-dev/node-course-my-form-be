import { IsString } from 'class-validator';

export class FieldTypeDto {
    @IsString()
    type: string;

    @IsString()
    formControl: string;
}
