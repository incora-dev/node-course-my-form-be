import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { FormField } from '../formFields/formField.entity';
import { FieldPattern } from '../fieldPatterns/fieldPattern.entity';

@Entity('field_types')
export class FieldType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    type: string;

    @Column({ type: 'varchar', nullable: false })
    formControl: string;

    @OneToMany(type => FormField, formField => formField.fieldType)
    fields: FormField[];

    @ManyToMany(() => FieldPattern, fieldPattern => fieldPattern.fieldTypes)
    @JoinTable({
        name: 'field_types_patterns',
        joinColumn: { name: 'fieldTypeId' },
        inverseJoinColumn: { name: 'fieldPatternId' },
    })
    patterns: FieldPattern[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
