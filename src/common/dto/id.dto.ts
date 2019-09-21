import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdDto {
    @ApiModelProperty()
    @IsNumberString()
    id: number;
}
