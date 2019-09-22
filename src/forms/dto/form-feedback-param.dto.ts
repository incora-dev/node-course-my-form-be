import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FormFeedbackParamDto {
    @ApiModelProperty()
    @IsNumberString()
    id: number;

    @ApiModelProperty()
    @IsNumberString()
    feedbackId: number;
}
