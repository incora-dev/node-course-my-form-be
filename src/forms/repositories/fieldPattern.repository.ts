import { Repository, EntityRepository } from 'typeorm';
import { FieldPattern } from '../entities/fieldPatterns.entity';

@EntityRepository(FieldPattern)
export class FieldPatternRepository extends Repository<FieldPattern> {}
