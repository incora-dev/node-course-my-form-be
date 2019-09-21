import { IsString, Matches, IsOptional, IsEmail } from 'class-validator';

export class UpdateAccountDto {
    @IsOptional()
    @IsEmail()
    email?: string;

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
}
