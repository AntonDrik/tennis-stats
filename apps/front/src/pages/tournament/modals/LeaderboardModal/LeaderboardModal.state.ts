import { atomWithStorage } from 'jotai/utils';

const leaderboardTabAtom = atomWithStorage<string>('leaderboardTab', 'tours');

export { leaderboardTabAtom };
