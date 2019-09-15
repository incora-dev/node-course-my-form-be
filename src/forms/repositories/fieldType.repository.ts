import { Repository, EntityRepository } from 'typeorm';
import { FieldType } from '../entities/fieldType.entity';

@EntityRepository(FieldType)
export class FieldTypeRepository extends Repository<FieldType> {}
