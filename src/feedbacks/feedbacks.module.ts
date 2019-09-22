import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackFieldsModule } from './feedbackFields/feedbackFields.module';
import { FeedbackFieldsController } from './feedbackFields/feedbackFields.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackRepository]), FeedbackFieldsModule],
    controllers: [FeedbackFieldsController, FeedbacksController],
    providers: [FeedbacksService],
    exports: [FeedbacksService],
})
export class FeedbacksModule {}
