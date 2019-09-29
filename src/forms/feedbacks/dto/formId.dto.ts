import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FormIdDto {
    @ApiModelProperty()
    @IsNumberString()
    formId: number;
}
