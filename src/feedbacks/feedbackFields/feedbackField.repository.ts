import { Repository, EntityRepository } from 'typeorm';
import { FeedbackField } from './feedbackField.entity';

@EntityRepository(FeedbackField)
export class FeedbackFieldRepository extends Repository<FeedbackField> {}
