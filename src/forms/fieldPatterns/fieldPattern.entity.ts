import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { FieldType } from '../fieldTypes/fieldType.entity';
import { FormField } from '../formFields/formField.entity';

@Entity('field_patterns')
export class FieldPattern extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    value: string;

    @ManyToMany(() => FieldType, fieldType => fieldType.patterns)
    fieldTypes: FieldType[];

    @OneToMany(type => FormField, formField => formField.pattern)
    fields: FormField[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
