import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { SaveFeedbackDto } from './dto/save-feedback.dto';

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {
    private logger = new Logger('FeedbackRepository');

    async createFeedback(saveFeedbackDto: SaveFeedbackDto) {
        const feedback = await this.save(saveFeedbackDto);

        if (!feedback) {
            this.logger.error('Feedback not created: ' + saveFeedbackDto);
            throw new InternalServerErrorException('Feedback not created.');
        }

        return feedback;
    }
}
