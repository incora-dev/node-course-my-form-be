import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
    getOne(@Param('id') id: number): Promise<Form> {
        return this.formsService.getOne(id);
    }

}
