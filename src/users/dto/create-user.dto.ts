import { IsEnum } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
    @ApiModelProperty({ enum: Object.values(UserRole) })
    @IsEnum(UserRole)
    role: UserRole;
}
