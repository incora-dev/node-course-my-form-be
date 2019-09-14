import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { FormField } from './formField.entity';

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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;
}
