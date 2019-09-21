import { IsString } from 'class-validator';

export class FieldPatternDto {
    @IsString()
    name: string;

    @IsString()
    value: string;
}
