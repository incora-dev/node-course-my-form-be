import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFieldRepository } from './feedbackField.repository';
import { FeedbackFieldsService } from './feedbackFields.service';
import { FeedbackFieldsController } from './feedbackFields.controller';
import { FormFieldsModule } from '../../forms/formFields/formFields.module';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackFieldRepository]), FormFieldsModule],
    controllers: [FeedbackFieldsController],
    providers: [FeedbackFieldsService],
    exports: [FeedbackFieldsService],
})
export class FeedbackFieldsModule {}
