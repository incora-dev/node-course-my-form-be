import { Repository, EntityRepository } from 'typeorm';
import { FieldType } from './fieldType.entity';

@EntityRepository(FieldType)
export class FieldTypeRepository extends Repository<FieldType> {}
