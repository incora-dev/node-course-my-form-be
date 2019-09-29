import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from '../feedback.entity';
import { FeedbackField } from './feedbackField.entity';
import { FormField } from '../../formFields/formField.entity';
import { FeedbackFieldRepository } from './feedbackField.repository';
import { FormFieldsService } from '../../formFields/formFields.service';
import { CreateFeedbackFieldDto } from './dto/create-feedback-field.dto';
import { SaveFeedbackFieldDto } from './dto/save-feedback-field.dto';

@Injectable()
export class FeedbackFieldsService {
    private logger = new Logger('FeedbackFieldsService');

    constructor(
        @InjectRepository(FeedbackFieldRepository)
        private readonly feedbackFieldRepository: FeedbackFieldRepository,

        private formFieldsService: FormFieldsService,
    ) {}

    async createFeedbackFields(
        createFeedbackFieldsDto: CreateFeedbackFieldDto[],
        feedback: Feedback,
    ): Promise<FeedbackField[]> {
        const createdFields: FeedbackField[] = [];

        for (const createFieldDto of createFeedbackFieldsDto) {
            createdFields.push(await this.createFeedbackField(createFieldDto, feedback));
        }

        return createdFields;
    }

    async createFeedbackField(
        createFeedbackFieldDto: CreateFeedbackFieldDto,
        feedback: Feedback,
    ): Promise<FeedbackField> {
        const formField: FormField = await this.formFieldsService.getFormFieldById(
            createFeedbackFieldDto.formFieldId,
        );

        const saveFeedbackFieldDto: SaveFeedbackFieldDto = {
            ...createFeedbackFieldDto,
            feedback,
            formField,
        };

        return await this.feedbackFieldRepository.createFeedbackField(saveFeedbackFieldDto);
    }
}
