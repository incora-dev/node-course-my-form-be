import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IFormField } from './interfaces/form-field';
import { User } from '../users/user.entity';

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar' })
    formCode: string;

    @Column({ type: 'varchar', nullable: true })
    background: string;

    @Column({ type: 'json', default: [] })
    fields: IFormField[];

    @ManyToOne(type => User, owner => owner.forms)
    owner: User;
}
