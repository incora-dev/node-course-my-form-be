import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Form])],
    providers: [FormsService],
    controllers: [FormsController],
})
export class FormsModule {}
