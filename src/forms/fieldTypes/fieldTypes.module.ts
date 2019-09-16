import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldTypesService } from './fieldTypes.service';
import { FieldTypeRepository } from './fieldType.repository';
import { FieldTypesController } from './fieldTypes.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FieldTypeRepository])],
    controllers: [FieldTypesController],
    providers: [FieldTypesService],
    exports: [FieldTypesService],
})
export class FieldTypesModule {}
