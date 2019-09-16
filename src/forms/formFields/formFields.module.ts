import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldService } from './formFields.service';
import { FormFieldRepository } from './formField.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FormFieldRepository])],
    providers: [FormFieldService],
    exports: [FormFieldService],
})
export class FormFieldsModule {}
