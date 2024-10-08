import { atomWithStorage } from 'jotai/utils';

const appearanceAtom = atomWithStorage<'dark' | 'light'>('light', 'light');

export { appearanceAtom };
