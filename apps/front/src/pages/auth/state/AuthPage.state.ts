import { RegistrationDto } from '@tennis-stats/dto';
import { atom } from 'jotai';

export type TAuthTab = 'login' | 'registration';

const authPageSelectedTabAtom = atom<TAuthTab>('login');

const registrationFormAtom = atom<RegistrationDto | null>(null);

export { authPageSelectedTabAtom, registrationFormAtom };
