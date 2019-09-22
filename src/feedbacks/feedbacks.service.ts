import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from '../forms/form.entity';
import { Feedback } from './feedback.entity';
import { FormRepository } from '../forms/form.repository';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackFieldsService } from './feedbackFields/feedbackFields.service';
import { SaveFeedbackDto } from './dto/save-feedback.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateFeedbackFieldDto } from './feedbackFields/dto/create-feedback-field.dto';

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

    async createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const createFeedbackFieldDto: CreateFeedbackFieldDto[] = createFeedbackDto.fields;

        const form: Form = await this.formRepository.getFormById(createFeedbackDto.formId);

        const saveFeedbackDto: SaveFeedbackDto = {
            domainUrl: createFeedbackDto.domainUrl,
            form,
        };

        const feedback: Feedback = await this.feedbackRepository.createFeedback(saveFeedbackDto);

        const feedbackFields = await this.feedbackFieldsService.createFeedbackFields(
            createFeedbackFieldDto,
            feedback,
        );

        return await this.getFeedbackById(feedback.id);
    }

    async getFeedbackById(id: number, fullData: boolean = true): Promise<Feedback> {
        const queryParams: any = {};

        // get feedback with full data
        if (fullData) {
            queryParams.relations = ['fields', 'fields.formField'];
        }

        const feedback: Feedback = await this.feedbackRepository.findOne(id, queryParams);

        if (!feedback) {
            throw new NotFoundException(`Feedback with ID "${id}" not found.`);
        }

        return feedback;
    }
}
