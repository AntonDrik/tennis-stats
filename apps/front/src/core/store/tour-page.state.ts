import { IGameSet, IMatch, ITour, ITournament } from '@tennis-stats/types';
import { atom } from 'jotai';

interface ITournamentState {
  selectedTournament: ITournament | null;
  selectedTour: ITour | null;
  selectedMatch: IMatch | null;
  selectedGameSet: IGameSet | null;
}

const tournamentAtom = atom<ITournamentState>({
  selectedTournament: null,
  selectedTour: null,
  selectedMatch: null,
  selectedGameSet: null,
});

const updateTournamentStateAtom = atom(
  null,
  (get, set, update: Partial<ITournamentState>) => {
    const currentState = get(tournamentAtom);

    set(tournamentAtom, {
      ...currentState,
      ...update,
    });
  }
);

export { tournamentAtom, updateTournamentStateAtom, ITournamentState };
