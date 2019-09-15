import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldTypesSeederService } from './fieldTypes.service';
import { FieldTypeRepository } from './fieldType.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FieldTypeRepository])],
    providers: [FieldTypesSeederService],
    exports: [FieldTypesSeederService],
})
export class FieldTypesSeederModule {}
