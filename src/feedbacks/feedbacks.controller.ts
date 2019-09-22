import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
@UseGuards(AuthGuard('jwt'))
export class FeedbacksController {
    constructor(private feedbacksService: FeedbacksService) {}

    // TODO
}
