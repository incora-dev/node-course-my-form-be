import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPatternsSeederService } from './fieldPatterns.service';
import { FieldPatternRepository } from './fieldPattern.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FieldPatternRepository])],
    providers: [FieldPatternsSeederService],
    exports: [FieldPatternsSeederService],
})
export class FieldPatternsSeederModule {}
