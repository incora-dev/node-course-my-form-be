import {
    Controller,
    ForbiddenException,
    Post,
    Get,
    Delete,
    Param,
    UseGuards,
    Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Form } from './form.entity';
import { User } from '../users/user.entity';
import { FormDto } from './dto/form.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { GetUser } from '../users/decorators/get-user-decorator';
import { FormsService } from './forms.service';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {
    constructor(private formsService: FormsService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async create(@Body() formDto: FormDto, @GetUser() user: User): Promise<Form> {
        return await this.formsService.create(formDto, user);
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

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async delete(@Param('id') formId: number, @GetUser() user: User): Promise<void> {
        return await this.formsService.delete(formId, user);
    }
}
