import { atomWithStorage } from 'jotai/utils';

const tabsAtom = atomWithStorage<string>('selectedTab', '0');

export { tabsAtom };
