import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './enums/user-role.enum';
import { IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Form } from '../forms/form.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @Column({ type: 'varchar', unique: true })
    email: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', select: false })
    password: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: true })
    lastName: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: true })
    address: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: true })
    country: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: true })
    city: string;

    @ApiModelProperty()
    @Column({ type: 'varchar', nullable: true })
    postalCode: string;

    @ApiModelProperty()
    @Column({ type: 'text', nullable: true })
    aboutMe: string;

    @ApiModelProperty({ enum: Object.values(UserRole) })
    @Column({ type: 'varchar', nullable: false })
    @IsEnum(UserRole)
    role: UserRole;

    @OneToMany(type => Form, form => form.owner)
    forms: Form[];

    @CreateDateColumn({ type: 'timestamp', select: false })
    createdAt: number;

    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt: number;
}
