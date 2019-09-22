import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedbackFieldsService } from './feedbackFields.service';

@Controller('feedbacks/feedback-fields')
@UseGuards(AuthGuard('jwt'))
export class FeedbackFieldsController {
    constructor(private feedbackFieldsService: FeedbackFieldsService) {}
}
