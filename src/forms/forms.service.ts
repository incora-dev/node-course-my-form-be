import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Form)
                private readonly formRepository: Repository<Form>,
    ) {}

    async delete(id: number): Promise<DeleteResult> {
        return await this.formRepository.delete(id);
    }

}
