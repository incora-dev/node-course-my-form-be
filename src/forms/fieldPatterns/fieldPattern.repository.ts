import { Repository, EntityRepository } from 'typeorm';
import { FieldPattern } from './fieldPattern.entity';

@EntityRepository(FieldPattern)
export class FieldPatternRepository extends Repository<FieldPattern> {}
