import { atomWithStorage } from 'jotai/utils';

const tournamentActiveTabAtom = atomWithStorage<string>('tournamentActiveTab', '0');

export { tournamentActiveTabAtom };
