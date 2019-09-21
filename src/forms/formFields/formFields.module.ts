import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldService } from './formFields.service';
import { FormFieldRepository } from './formField.repository';
import { FieldTypesModule } from '../fieldTypes/fieldTypes.module';
import { FieldPatternsModule } from '../fieldPatterns/fieldPatterns.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FormFieldRepository]),
        FieldTypesModule,
        FieldPatternsModule,
    ],
    providers: [FormFieldService],
    exports: [FormFieldService],
})
export class FormFieldsModule {}
