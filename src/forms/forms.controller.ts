import { Controller, Post, Get, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Form } from './form.entity';
import { User } from '../users/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { GetUser } from '../users/decorators/get-user-decorator';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {
    constructor(private formsService: FormsService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async createForm(@Body() createFormDto: CreateFormDto, @GetUser() user: User): Promise<Form> {
        return await this.formsService.createForm(createFormDto, user);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getUserForms(@GetUser() user: User): Promise<Form[]> {
        return await this.formsService.getUserForms(user.id);
    }

    @Get('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getUserForm(@Param('id') formId: number, @GetUser() user: User): Promise<Form> {
        return await this.formsService.getUserForm(formId, user.id);
    }

    @Put('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async updateForm(
        @Param('id') formId: number,
        @Body() updateFormDto: UpdateFormDto,
        @GetUser() user: User,
        // TODO
        // ): Promise<Form> {
    ) {
        return await this.formsService.updateForm(formId, updateFormDto, user.id);
    }

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async deleteForm(@Param('id') formId: number, @GetUser() user: User): Promise<void> {
        return await this.formsService.deleteForm(formId, user);
    }
}
