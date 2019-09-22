import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Feedback } from './feedback.entity';

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {
    private logger = new Logger('FeedbackRepository');

    // TODO
}
