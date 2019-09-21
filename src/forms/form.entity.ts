import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { FormField } from './formFields/formField.entity';

@Entity('forms')
export class Form extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    background: string;

    @Column({ type: 'varchar', nullable: false })
    formCode: string;

    @ManyToOne(type => User, user => user.forms, { nullable: false, onDelete: 'CASCADE' })
    owner: User;

    @OneToMany(type => FormField, formField => formField.form)
    fields: FormField[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
