import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
} from 'typeorm';
import { FeedbackField } from '../forms/feedbacks/feedbackFields/feedbackField.entity';

@Entity('files')
export class File extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    mimetype: string;

    @Column({ type: 'varchar', nullable: false })
    path: string;

    @Column({ type: 'integer', nullable: false })
    size: number;

    @ManyToMany(() => FeedbackField, feedbackField => feedbackField.files)
    feedbackFields: FeedbackField[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @CreateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
