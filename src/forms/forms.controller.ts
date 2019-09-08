import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from "../decorators/roles.decorator";
import { UserRole } from "../users/user-role.enum";
import { RolesGuard } from "../guards/roles.guard";
import { Form } from './form.entity';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {

    constructor(private formsService: FormsService) {}

    @Get('')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    getAll(): Promise<Array<Form>> {
        return this.formsService.getAll();
    }

}
