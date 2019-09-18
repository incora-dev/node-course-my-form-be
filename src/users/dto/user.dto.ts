import { IsString, MinLength, MaxLength, Matches, IsOptional, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
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
    @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
        message: 'First name can contain only letters',
    })
    firstName: string;

    @ApiModelProperty()
    @IsOptional()
    @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
        message: 'First name can contain only letters',
    })
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
}
