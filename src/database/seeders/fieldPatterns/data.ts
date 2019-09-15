import { UserRole } from '../../../users/enums/user-role.enum';

export const FieldPatternsSeeds = [
    {
        name: 'email',
        value:
            // tslint:disable-next-line: quotemark
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    },
    {
        name: 'url',
        value: '/^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$/',
    },
    {
        name: 'ip_address',
        value:
            '/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/',
    },
];
