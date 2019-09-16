import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormFieldRepository } from './formField.repository';

@Injectable()
export class FormFieldService {
    constructor(
        @InjectRepository(FormFieldRepository)
        private readonly formFieldRepository: FormFieldRepository,
    ) {}
}
