import { Repository, EntityRepository } from 'typeorm';
import { FormField } from './formField.entity';

@EntityRepository(FormField)
export class FormFieldRepository extends Repository<FormField> {}
