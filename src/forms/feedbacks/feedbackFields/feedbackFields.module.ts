import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFieldRepository } from './feedbackField.repository';
import { FeedbackFieldsService } from './feedbackFields.service';
import { FormFieldsModule } from '../../formFields/formFields.module';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackFieldRepository]), FormFieldsModule],
    providers: [FeedbackFieldsService],
    exports: [FeedbackFieldsService],
})
export class FeedbackFieldsModule {}
