import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Form } from '../form.entity';
import { FieldType } from '../fieldTypes/fieldType.entity';
import { FieldPattern } from '../fieldPatterns/fieldPattern.entity';

@Entity('form_fields')
export class FormField extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    placeholder: string;

    @ManyToOne(type => FieldPattern, fieldPattern => fieldPattern.fields, { nullable: false })
    pattern: FieldPattern;

    @ManyToOne(type => Form, form => form.fields, { onDelete: 'CASCADE' })
    form: Form;

    @ManyToOne(type => FieldType, fieldType => fieldType.fields)
    fieldType: FieldType;

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
