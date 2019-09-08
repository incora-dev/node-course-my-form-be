import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { FormsService } from './forms.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {

    constructor(private formsService: FormsService) {}

    @Delete('/:id')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.formsService.delete(id);
    }

}
