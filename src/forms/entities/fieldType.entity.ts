import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity()
export class FieldType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    type: string;

    @Column({ type: 'varchar', nullable: false })
    formControl: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: number;
}
