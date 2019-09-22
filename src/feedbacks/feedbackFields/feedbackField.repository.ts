import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { FeedbackField } from './feedbackField.entity';
import { SaveFeedbackFieldDto } from './dto/save-feedback-field.dto';

@EntityRepository(FeedbackField)
export class FeedbackFieldRepository extends Repository<FeedbackField> {
    private logger = new Logger('FeedbackFieldRepository');

    async createFeedbackField(saveFeedbackFieldDto: SaveFeedbackFieldDto) {
        const feedbackField = await this.save(saveFeedbackFieldDto);

        if (!feedbackField) {
            this.logger.error('Feedback field not created: ' + saveFeedbackFieldDto);
            throw new InternalServerErrorException('Feedback field not created.');
        }

        return feedbackField;
    }
}
