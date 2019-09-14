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
import { User } from '../../users/user.entity';
import { FormField } from './formField.entity';

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

    @ManyToOne(type => User, user => user.forms, { nullable: false })
    owner: User;

    @OneToMany(type => FormField, formField => formField.form)
    fields: FormField[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;
}
