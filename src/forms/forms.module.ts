import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormRepository } from './form.repository';
import { FieldTypesModule } from './fieldTypes/fieldTypes.module';
import { FieldTypesController } from './fieldTypes/fieldTypes.controller';
import { FormFieldsModule } from './formFields/formFields.module';
import { FeedbackRepository } from './feedbacks/feedback.repository';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { FeedbacksController } from './feedbacks/feedbacks.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([FormRepository, FeedbackRepository]),
        FieldTypesModule,
        FormFieldsModule,
        FeedbacksModule,
    ],
    controllers: [FieldTypesController, FeedbacksController, FormsController],
    providers: [FormsService],
    exports: [FormsService],
})
export class FormsModule {}
