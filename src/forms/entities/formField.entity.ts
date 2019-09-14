import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Form } from './form.entity';
import { FieldType } from './fieldType.entity';

@Entity('form_fields')
export class FormField extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    placeholder: string;

    @Column({ type: 'varchar', nullable: true })
    pattern: string;

    @ManyToOne(type => Form, form => form.fields)
    form: Form;

    @ManyToOne(type => FieldType, fieldType => fieldType.fields)
    fieldType: FieldType;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;
}
