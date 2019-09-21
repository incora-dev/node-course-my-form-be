import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormRepository } from './form.repository';
import { FieldTypesModule } from './fieldTypes/fieldTypes.module';
import { FieldTypesController } from './fieldTypes/fieldTypes.controller';
import { FormFieldsModule } from './formFields/formFields.module';

@Module({
    imports: [TypeOrmModule.forFeature([FormRepository]), FieldTypesModule, FormFieldsModule],
    controllers: [FieldTypesController, FormsController],
    providers: [FormsService],
    exports: [FormsService],
})
export class FormsModule {}
