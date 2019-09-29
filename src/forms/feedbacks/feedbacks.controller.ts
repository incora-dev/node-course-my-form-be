import { Controller, Post, Body, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { User } from '../../users/user.entity';
import { FeedbacksService } from './feedbacks.service';
import { FormIdDto } from './dto/formId.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { GetUser } from '../../users/decorators/get-user-decorator';
import { FeedbackIdDto } from './dto/feedbackId.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('forms/:formId/feedbacks')
export class FeedbacksController {
    constructor(private feedbacksService: FeedbacksService) {}

    @Post()
    async createFormFeedback(
        @Param() params: FormIdDto,
        @Body() createFeedbackDto: CreateFeedbackDto,
    ): Promise<Feedback> {
        return await this.feedbacksService.createFormFeedback(params.formId, createFeedbackDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getFormFeedbacks(@Param() params: FormIdDto, @GetUser() user: User): Promise<Feedback[]> {
        return await this.feedbacksService.getFormFeedbacks(params.formId, user);
    }

    @Get('/:feedbackId')
    @UseGuards(AuthGuard('jwt'))
    async getFormFeedbackById(
        @Param() params: FeedbackIdDto,
        @GetUser() user: User,
    ): Promise<Feedback> {
        return await this.feedbacksService.getFormFeedbackById(
            params.formId,
            params.feedbackId,
            user,
        );
    }
}
