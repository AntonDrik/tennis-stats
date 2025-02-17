import { atomWithStorage } from 'jotai/utils';

export type TControl = 'common' | 'pairs';

const profileStatsActiveTabAtom = atomWithStorage<TControl>('profileStatsActiveTab', 'common');

export { profileStatsActiveTabAtom };
