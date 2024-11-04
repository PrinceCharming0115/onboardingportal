import * as PATH from './path';

const AdherenceStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'revoked', label: 'Revoked' },
    { value: 'not_active', label: 'Not Active' },
    { value: 'pending', label: 'Pending' }
];

const AuthorisationRegistryIDOptions = [
    { value: 'EU.EORI.NL000000004', label: 'EU.EORI.NL000000004' },
    { value: 'EU.EORI.NLDVUPIRTEST1', label: 'EU.EORI.NLDVUPIRTEST1' }
];

const AuthorisationRegistryNameOptions = [
    { value: 'iSHARE Test Authorization Registry', label: 'iSHARE Test Authorization Registry' },
    { value: 'DVU PIR Test1', label: 'DVU PIR Test 1' }
]

export {
    PATH,
    AdherenceStatusOptions,
    AuthorisationRegistryIDOptions,
    AuthorisationRegistryNameOptions
}