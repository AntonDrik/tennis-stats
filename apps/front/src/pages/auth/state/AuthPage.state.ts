import { RegistrationDto } from '@tennis-stats/dto';
import { atom } from 'jotai';

const authPageSelectedTabAtom = atom(0);

const registrationFormAtom = atom<RegistrationDto | null>(null);

export { authPageSelectedTabAtom, registrationFormAtom };
