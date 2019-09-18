import { Controller, Post, Get, Put, Delete, Param, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FieldType } from './fieldType.entity';
import { FieldTypesService } from './fieldTypes.service';

@Controller('forms/field-types')
@UseGuards(AuthGuard('jwt'))
export class FieldTypesController {
    constructor(private fieldTypesService: FieldTypesService) {}

    @Get()
    async getFieldTypes(): Promise<FieldType[]> {
        return await this.fieldTypesService.getFieldTypes();
    }

    @Get('/:id')
    async getFieldTypeByParams(@Param('id') id: number): Promise<FieldType> {
        return await this.fieldTypesService.getFieldTypeByParams({ id });
    }
}
