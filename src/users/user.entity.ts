import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.enum';
import { IsEnum } from 'class-validator';
import { Form } from "../forms/form.entity";
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
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

    @ApiModelProperty({ enum: ['ADMIN', 'USER'] })
    @Column({ type: 'varchar', nullable: false })
    @IsEnum(UserRole)
    role: string;

    @OneToMany(type => Form, form => form.owner)
    forms: Array<Form>;
}
