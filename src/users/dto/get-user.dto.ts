import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class GetUserDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
