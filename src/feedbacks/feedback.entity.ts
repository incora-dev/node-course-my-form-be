import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import { Form } from '../forms/form.entity';

@Entity('feedbacks')
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    domainUrl: string;

    @ManyToOne(type => Form, form => form.feedbacks, { nullable: false, onDelete: 'CASCADE' })
    form: Form;

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
