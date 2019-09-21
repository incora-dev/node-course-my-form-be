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

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password to weak',
    })
    password?: string;

    @IsOptional()
    @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
        message: 'First name can contain only letters',
    })
    firstName?: string;

    @IsOptional()
    @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
        message: 'First name can contain only letters',
    })
    lastName?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    aboutMe?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
