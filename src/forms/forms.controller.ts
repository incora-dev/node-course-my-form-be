import { Controller, Post, Get, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Form } from './form.entity';
import { User } from '../users/user.entity';
import { Feedback } from '../feedbacks/feedback.entity';
import { FormsService } from './forms.service';
import { IdDto } from '../common/dto/id.dto';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { GetUser } from '../users/decorators/get-user-decorator';
import { FormFeedbackParamDto } from './dto/form-feedback-param.dto';

@Controller('forms')
@UseGuards(AuthGuard('jwt'))
export class FormsController {
    constructor(private formsService: FormsService) {}

    @Post()
    async createForm(@Body() createFormDto: CreateFormDto, @GetUser() user: User): Promise<Form> {
        return await this.formsService.createForm(createFormDto, user);
    }

    @Get()
    async getUserForms(@GetUser() user: User): Promise<Form[]> {
        return await this.formsService.getUserForms(user.id);
    }

    @Get('/:id')
    async getUserForm(@Param() params: IdDto, @GetUser() user: User): Promise<Form> {
        return await this.formsService.getUserForm(params.id, user.id);
    }

    @Put('/:id')
    async updateForm(
        @Param() params: IdDto,
        @Body() updateFormDto: UpdateFormDto,
        @GetUser() user: User,
    ): Promise<Form> {
        return await this.formsService.updateForm(params.id, updateFormDto, user);
    }

    @Delete('/:id')
    async deleteForm(@Param() params: IdDto, @GetUser() user: User): Promise<void> {
        return await this.formsService.deleteForm(params.id, user);
    }

    @Get(':id/feedbacks')
    async getFormFeedbacks(@Param() params: IdDto, @GetUser() user: User): Promise<Feedback[]> {
        return await this.formsService.getFormFeedbacks(params.id, user);
    }

    @Get(':id/feedbacks/:feedbackId')
    async getFormFeedbackById(
        @Param() params: FormFeedbackParamDto,
        @GetUser() user: User,
    ): Promise<Feedback> {
        return await this.formsService.getFormFeedbackById(params.id, params.feedbackId, user);
    }
}
