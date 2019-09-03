import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class GetUserDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: string;
}
