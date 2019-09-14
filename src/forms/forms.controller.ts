import {
    Controller,
    ForbiddenException,
    Get,
    Param,
    Req,
    UseGuards,
    Post,
    Body,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { CreateFormDto } from './dto/create-form.dto';

import { Form } from './form.entity';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {
    constructor(private formsService: FormsService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    create(@Body() body: CreateFormDto, @Req() request): Promise<Form> {
        return this.formsService.create({ owner: request.user, ...body });
    }

    @Get('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getOne(@Param('id') id: number, @Req() request): Promise<Form> {
        const form = await this.formsService.getOne(id);

        if (request.user.id !== form.owner.id) {
            throw new ForbiddenException();
        }

        return form;
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    getAll(@Req() request): Promise<Form[]> {
        return this.formsService.getAll(request.user.id);
    }
}
