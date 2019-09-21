import { SeedFieldTypeDto } from './dto/seed-field-type.dto';

export const FieldTypesSeeds: SeedFieldTypeDto[] = [
    {
        type: 'text',
        formControl: 'text',
        patterns: ['email', 'url', 'ip_address'],
    },
    {
        type: 'textarea',
        formControl: 'textarea',
    },
    {
        type: 'password',
        formControl: 'password',
    },
    {
        type: 'files',
        formControl: 'files',
    },
    {
        type: 'checkbox',
        formControl: 'checkbox',
    },
    {
        type: 'radio',
        formControl: 'radio',
    },
    {
        type: 'submit',
        formControl: 'submit',
    },
];
