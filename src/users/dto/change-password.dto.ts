import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password to weak',
    })
    newPassword: string;
}
