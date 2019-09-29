import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Feedback } from '../feedback.entity';
import { File } from '../../../files/file.entity';
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
    })
    formField: FormField;

    @ManyToMany(() => File, file => file.feedbackFields)
    @JoinTable({
        name: 'feedback_fields_files',
        joinColumn: { name: 'feedbackFieldId' },
        inverseJoinColumn: { name: 'fileId' },
    })
    files: File[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
