import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsEnum,
    IsOptional,
    IsEmail,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password to weak',
    })
    password: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    country?: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    postalCode?: string;

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    aboutMe?: string;

    @ApiModelProperty({ enum: ['ADMIN', 'USER'] })
    @IsEnum(UserRole)
    role: UserRole;
}
