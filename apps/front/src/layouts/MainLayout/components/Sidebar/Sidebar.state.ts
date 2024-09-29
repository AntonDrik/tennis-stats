import { atom } from 'jotai';

const OPENED_SIDEBAR_WIDTH = 250;
const CLOSED_SIDEBAR_WIDTH = 0;

const sidebarAtom = atom({ isOpen: false, width: CLOSED_SIDEBAR_WIDTH });

const changeSidebarAtom = atom(null, (get, set, isOpenValue: boolean) => {
  set(sidebarAtom, {
    isOpen: isOpenValue,
    width: isOpenValue ? OPENED_SIDEBAR_WIDTH : CLOSED_SIDEBAR_WIDTH,
  });
});

export { sidebarAtom, changeSidebarAtom };
