import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { UserRole } from './user-role.enum';
import { IsEnum } from 'class-validator';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @Column('text')
    @IsEnum(UserRole)
    role: string;
}
