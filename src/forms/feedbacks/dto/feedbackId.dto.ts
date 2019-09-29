import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FeedbackIdDto {
    @ApiModelProperty()
    @IsNumberString()
    formId: number;

    @ApiModelProperty()
    @IsNumberString()
    feedbackId: number;
}
