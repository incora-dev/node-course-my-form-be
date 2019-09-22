import { IsJSON, IsInt } from 'class-validator';

export class CreateFeedbackFieldDto {
    @IsJSON()
    data: JSON;

    @IsInt()
    formFieldId: number;
}
