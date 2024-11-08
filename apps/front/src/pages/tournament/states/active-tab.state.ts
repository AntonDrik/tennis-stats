import { atomWithStorage } from 'jotai/utils';

const tournamentActiveTabAtom = atomWithStorage<string>('selectedTab', '0');

export { tournamentActiveTabAtom };
