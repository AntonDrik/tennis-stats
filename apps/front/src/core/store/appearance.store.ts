import { atomWithStorage } from 'jotai/utils';

const appearanceAtom = atomWithStorage<'dark' | 'light'>('themeMode', 'light');

export { appearanceAtom };
