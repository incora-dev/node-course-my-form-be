import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPatternsService } from './fieldPatterns.service';
import { FieldPatternRepository } from './fieldPattern.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FieldPatternRepository])],
    providers: [FieldPatternsService],
    exports: [FieldPatternsService],
})
export class FieldPatternsModule {}
