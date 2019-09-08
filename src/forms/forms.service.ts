import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Form)
                private readonly formRepository: Repository<Form>,
    ) {}

    async getAll(): Promise<Form[]> {
        return await this.formRepository.find({relations: ['owner']});
    }

}
