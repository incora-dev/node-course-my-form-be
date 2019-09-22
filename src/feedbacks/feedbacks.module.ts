import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbackRepository } from './feedback.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackRepository])],
    controllers: [FeedbacksController],
    providers: [FeedbacksService],
    exports: [FeedbacksService],
})
export class FeedbacksModule {}
