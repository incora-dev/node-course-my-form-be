import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { UserRole } from '../../../users/enums/user-role.enum';

export const UsersSeeds: CreateUserDto[] = [
    {
        email: 'testAdmin1@mail.com',
        password: '111111Qq',
        firstName: 'Test',
        lastName: 'Admin1',
        address: 'Test address',
        country: 'Test country',
        city: 'Test city',
        postalCode: 'Test postalCode',
        aboutMe: 'Test aboutMe',
        role: UserRole.ADMIN,
    },
    {
        email: 'testAdmin2@mail.com',
        password: '111111Qq',
        firstName: 'Test',
        lastName: 'Admin2',
        address: 'Test address',
        country: 'Test country',
        city: 'Test city',
        postalCode: 'Test postalCode',
        aboutMe: 'Test aboutMe',
        role: UserRole.ADMIN,
    },
];
