import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksService } from './feedbacks.service';
import { FormRepository } from '../forms/form.repository';
import { FeedbackRepository } from './feedback.repository';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbackFieldsController } from './feedbackFields/feedbackFields.controller';
import { FeedbackFieldsModule } from './feedbackFields/feedbackFields.module';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackRepository, FormRepository]), FeedbackFieldsModule],
    controllers: [FeedbackFieldsController, FeedbacksController],
    providers: [FeedbacksService],
    exports: [FeedbacksService],
})
export class FeedbacksModule {}
