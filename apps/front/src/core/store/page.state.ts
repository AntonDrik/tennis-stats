import { IGameSet, IMatch, ITour } from '@tennis-stats/types';
import { atom } from 'jotai';


interface ITourPageState {
  selectedTour: ITour | null | undefined;
  selectedMatch: IMatch | null;
  selectedGameSet: IGameSet | null;
}

const tourPageStateAtom = atom<ITourPageState>({
  selectedTour: null,
  selectedMatch: null,
  selectedGameSet: null
});

export { tourPageStateAtom, ITourPageState };
