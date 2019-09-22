import { Controller, Post, Body } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
    constructor(private feedbacksService: FeedbacksService) {}

    @Post()
    async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        return await this.feedbacksService.createFeedback(createFeedbackDto);
    }
}
