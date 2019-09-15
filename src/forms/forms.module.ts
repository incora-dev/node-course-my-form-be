import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormRepository } from './form.repository';
import { FieldTypeRepository } from './fieldTypes/fieldType.repository';
import { FormFieldRepository } from './formFields/formField.repository';
import { FieldPatternRepository } from './fieldPatterns/fieldPattern.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            FormRepository,
            FieldTypeRepository,
            FormFieldRepository,
            FieldPatternRepository,
        ]),
    ],
    controllers: [FormsController],
    providers: [FormsService],
    exports: [FormsService],
})
export class FormsModule {}
