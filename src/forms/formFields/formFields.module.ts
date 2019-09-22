import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldsService } from './formFields.service';
import { FormFieldRepository } from './formField.repository';
import { FieldTypesModule } from '../fieldTypes/fieldTypes.module';
import { FieldPatternsModule } from '../fieldPatterns/fieldPatterns.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FormFieldRepository]),
        FieldTypesModule,
        FieldPatternsModule,
    ],
    providers: [FormFieldsService],
    exports: [FormFieldsService],
})
export class FormFieldsModule {}
