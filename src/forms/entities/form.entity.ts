import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Form extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    background: string;

    @Column({ type: 'varchar', nullable: false })
    formCode: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;

    @ManyToOne(type => User, user => user.forms, { nullable: false })
    owner: User;
}
