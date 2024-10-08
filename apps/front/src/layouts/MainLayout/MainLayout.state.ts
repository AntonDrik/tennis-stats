import { atom } from 'jotai';

interface IMainLayoutState {
  isHiddenMenu: boolean;
  isOpenedMenu: boolean;
  isFixedTop: boolean;
}

const mainLayoutAtom = atom<IMainLayoutState>({
  isHiddenMenu: false,
  isOpenedMenu: false,
  isFixedTop: false,
});

const updateMainLayoutAtom = atom(
  null,
  (get, set, updatedValue: Partial<IMainLayoutState>) => {
    const currentValue = get(mainLayoutAtom);

    set(mainLayoutAtom, { ...currentValue, ...updatedValue });
  }
);

export { mainLayoutAtom, updateMainLayoutAtom };
