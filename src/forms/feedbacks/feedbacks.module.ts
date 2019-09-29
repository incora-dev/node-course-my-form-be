import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksService } from './feedbacks.service';
import { FormRepository } from '../form.repository';
import { FeedbackRepository } from './feedback.repository';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbackFieldsModule } from './feedbackFields/feedbackFields.module';
import { FilesModule } from '../../files/files.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FeedbackRepository, FormRepository]),
        FeedbackFieldsModule,
        FilesModule,
    ],
    controllers: [FeedbacksController],
    providers: [FeedbacksService],
    exports: [FeedbacksService],
})
export class FeedbacksModule {}
