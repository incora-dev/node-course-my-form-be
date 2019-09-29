import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
