import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { SaveFeedbackDto } from './dto/save-feedback.dto';
import { User } from '../../users/user.entity';

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

    /**
     * Only for create feedback
     */
    async getFeedbackById(id: number, fullData: boolean = true): Promise<Feedback> {
        const queryParams: any = {};

        // get feedback with full data
        if (fullData) {
            queryParams.relations = ['fields', 'fields.formField'];
        }

        const feedback: Feedback = await this.findOne(id, queryParams);

        if (!feedback) {
            throw new NotFoundException(`Feedback with ID "${id}" not found.`);
        }

        return feedback;
    }

    async getFormFeedbackById(formId: number, feedbackId: number, user: User): Promise<Feedback> {
        // get feedback with all relations
        const formFeedback = await this.createQueryBuilder()
            .select('feedback')
            .from(Feedback, 'feedback')
            .leftJoinAndSelect('feedback.fields', 'fields')
            .leftJoinAndSelect('fields.formField', 'formField')
            .leftJoinAndSelect('formField.fieldType', 'fieldType')
            .leftJoinAndSelect('formField.pattern', 'pattern')
            .innerJoin('feedback.form', 'form')
            .innerJoin('form.owner', 'owner')
            .where('feedback.form = :formId', { formId })
            .andWhere('feedback.id = :feedbackId', { feedbackId })
            .andWhere('owner.id = :userId', { userId: user.id })
            .getOne();

        if (!formFeedback) {
            throw new NotFoundException(`Feedback with ID "${feedbackId}" not found.`);
        }

        return formFeedback;
    }

    async deleteFormFeedback(formId: number, feedbackId: number, user: User): Promise<void> {
        // get feedback
        const formFeedback = await this.createQueryBuilder()
            .select('feedback')
            .from(Feedback, 'feedback')
            .innerJoin('feedback.form', 'form')
            .innerJoin('form.owner', 'owner')
            .where('feedback.form = :formId', { formId })
            .andWhere('feedback.id = :feedbackId', { feedbackId })
            .andWhere('owner.id = :userId', { userId: user.id })
            .getOne();

        if (!formFeedback) {
            throw new NotFoundException(`Feedback with ID "${feedbackId}" not found.`);
        }

        const deletedResult = await this.remove(formFeedback);

        if (!deletedResult) {
            throw new InternalServerErrorException(`Feedback with ID "${feedbackId}" not deleted.`);
        }
    }
}
