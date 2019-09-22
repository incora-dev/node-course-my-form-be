import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackFieldRepository } from './feedbackField.repository';

@Injectable()
export class FeedbackFieldsService {
    constructor(
        @InjectRepository(FeedbackFieldRepository)
        private readonly feedbackFieldRepository: FeedbackFieldRepository,
    ) {}

    // TODO
}
