import { IsString, IsInt, IsArray } from 'class-validator';
import { CreateFeedbackFieldDto } from '../feedbackFields/dto/create-feedback-field.dto';

export class CreateFeedbackDto {
    @IsString()
    domainUrl: string;

    @IsArray()
    fields: CreateFeedbackFieldDto[];
}
