import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { Form } from './form.entity';

import { typeOrmConfig } from '../config/typeorm.config';

describe('FormsService', () => {
    let service: FormsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Form])],
            providers: [FormsService],
        }).compile();

        service = module.get<FormsService>(FormsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
