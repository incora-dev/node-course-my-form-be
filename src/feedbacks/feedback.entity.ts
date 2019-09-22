import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Form } from '../forms/form.entity';
import { FeedbackField } from './feedbackFields/feedbackField.entity';

@Entity('feedbacks')
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    domainUrl: string;

    @ManyToOne(type => Form, form => form.feedbacks, { nullable: false, onDelete: 'CASCADE' })
    form: Form;

    @OneToMany(type => FeedbackField, feedbackField => feedbackField.feedback)
    fields: FeedbackField[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;
}
