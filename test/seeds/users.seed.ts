import { UserRole } from '../../src/users/user-role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const usersSeed: {admins: CreateUserDto[], users: CreateUserDto[]} = {
    admins: [
        {
            email: 'testAdmin1@gmail.com',
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
            email: 'testAdmin2@gmail.com',
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
    ],
    users: [
        {
            email: 'testUser1@gmail.com',
            password: '111111Qq',
            firstName: 'Test',
            lastName: 'User1',
            address: 'Test address',
            country: 'Test country',
            city: 'Test city',
            postalCode: 'Test postalCode',
            aboutMe: 'Test aboutMe',
            role: UserRole.USER,
        },
        {
            email: 'testUser2@gmail.com',
            password: '111111Qq',
            firstName: 'Test',
            lastName: 'User2',
            address: 'Test address',
            country: 'Test country',
            city: 'Test city',
            postalCode: 'Test postalCode',
            aboutMe: 'Test aboutMe',
            role: UserRole.USER,
        },
    ]
};
