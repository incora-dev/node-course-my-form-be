import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormRepository } from './repositories/form.repository';
import { FieldTypeRepository } from './repositories/fieldType.repository';
import { FormFieldRepository } from './repositories/FormField.repository';
import { FieldPatternRepository } from './repositories/fieldPattern.repository';

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
