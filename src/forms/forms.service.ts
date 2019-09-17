import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Form)
                private readonly formRepository: Repository<Form>
    ) {}

    async create(createFormDto: CreateFormDto): Promise<Form> {
        return await this.formRepository.save(createFormDto);
    }

}
