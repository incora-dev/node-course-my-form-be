import { Repository, EntityRepository } from 'typeorm';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {}
