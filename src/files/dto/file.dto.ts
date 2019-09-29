import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FileDto {
    @ApiModelProperty()
    @IsString()
    mimetype: string;

    @ApiModelProperty()
    @IsString()
    path: string;

    @ApiModelProperty()
    @IsNumber()
    size: number;
}
