import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../form.entity';
import { Feedback } from './feedback.entity';
import { User } from '../../users/user.entity';
import { FormRepository } from '../form.repository';
import { FeedbackRepository } from './feedback.repository';
import { SaveFeedbackDto } from './dto/save-feedback.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateFeedbackFieldDto } from './feedbackFields/dto/create-feedback-field.dto';
import { FeedbackFieldsService } from './feedbackFields/feedbackFields.service';

@Injectable()
export class FeedbacksService {
    private logger = new Logger('FeedbacksService');

    constructor(
        @InjectRepository(FeedbackRepository)
        private feedbackRepository: FeedbackRepository,

        @InjectRepository(FormRepository)
        private formRepository: FormRepository,

        private feedbackFieldsService: FeedbackFieldsService,
    ) {}

    async createFormFeedback(formId, createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const createFeedbackFieldDto: CreateFeedbackFieldDto[] = createFeedbackDto.fields;

        const form: Form = await this.formRepository.getFormById(formId);

        const saveFeedbackDto: SaveFeedbackDto = {
            domainUrl: createFeedbackDto.domainUrl,
            form,
        };

        const feedback: Feedback = await this.feedbackRepository.createFeedback(saveFeedbackDto);

        const feedbackFields = await this.feedbackFieldsService.createFeedbackFields(
            createFeedbackFieldDto,
            feedback,
        );

        return await this.feedbackRepository.getFeedbackById(feedback.id);
    }

    async getFormFeedbacks(formId: number, user: User): Promise<Feedback[]> {
        const form: Form = await this.formRepository.findOne(formId, {
            where: { owner: user.id },
            relations: ['feedbacks'],
        });

        if (!form) {
            throw new NotFoundException(`Form with ID "${formId}" not found.`);
        }

        return form.feedbacks;
    }

    async getFormFeedbackById(formId: number, feedbackId: number, user: User): Promise<Feedback> {
        const feedback: Feedback = await this.feedbackRepository.getFormFeedbackById(
            formId,
            feedbackId,
            user,
        );

        return feedback;
    }
}
