import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Form)
                private readonly formRepository: Repository<Form>,
    ) {}

    async getAll(id: number): Promise<Form[]> {
        return await this.formRepository.find({
            relations: ['owner'],
            where: {owner: {id}},
        });
    }

}
