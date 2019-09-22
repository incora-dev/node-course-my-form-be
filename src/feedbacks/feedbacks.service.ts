import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbacksService {
    private logger = new Logger('FeedbacksService');

    constructor(
        @InjectRepository(FeedbackRepository)
        private feedbackRepository: FeedbackRepository,
    ) {}
}
