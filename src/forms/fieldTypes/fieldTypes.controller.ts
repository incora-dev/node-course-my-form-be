import { Controller, Post, Get, Put, Delete, Param, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/users/enums/user-role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { GetUser } from '../../users/decorators/get-user-decorator';
import { FieldType } from './fieldType.entity';
import { FieldTypesService } from './fieldTypes.service';

@Controller('forms/field-types')
@UseGuards(AuthGuard('jwt'))
export class FieldTypesController {
    constructor(private fieldTypesService: FieldTypesService) {}

    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getFieldTypes(): Promise<FieldType[]> {
        return await this.fieldTypesService.getFieldTypes();
    }

    @Get('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getFieldTypeByParams(@Param('id') id: number): Promise<FieldType> {
        return await this.fieldTypesService.getFieldTypeByParams({ id });
    }
}
