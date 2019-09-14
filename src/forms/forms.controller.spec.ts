import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { Form } from './entities/form.entity';

describe('FormsController', () => {
    let controller: FormsController;
    let service: FormsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FormsService,
                {
                    provide: getRepositoryToken(Form),
                    useClass: Repository,
                },
            ],
            controllers: [FormsController],
            exports: [FormsService],
        }).compile();
        service = module.get<FormsService>(FormsService);
        controller = module.get<FormsController>(FormsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
