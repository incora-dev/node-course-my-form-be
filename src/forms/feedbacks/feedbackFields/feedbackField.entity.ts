import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Feedback } from '../feedback.entity';
import { FormField } from '../../formFields/formField.entity';

@Entity('feedback_fields')
export class FeedbackField extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'jsonb', nullable: false })
    data: JSON;

    @ManyToOne(type => Feedback, feedback => feedback.fields, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    feedback: Feedback;

    @ManyToOne(type => FormField, formField => formField.feedbackFields, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    formField: FormField;

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
