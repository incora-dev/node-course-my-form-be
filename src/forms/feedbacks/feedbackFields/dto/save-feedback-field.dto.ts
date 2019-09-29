import { IsJSON, IsNotEmpty } from 'class-validator';
import { FormField } from '../../../formFields/formField.entity';
import { Feedback } from '../../feedback.entity';

export class SaveFeedbackFieldDto {
    @IsJSON()
    data: JSON;

    @IsNotEmpty()
    feedback: Feedback;

    @IsNotEmpty()
    formField: FormField;
}
