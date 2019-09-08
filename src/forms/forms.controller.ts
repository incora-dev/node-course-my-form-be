import { Controller, ForbiddenException, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Form } from './form.entity';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {

    constructor(private formsService: FormsService) {}

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

}
