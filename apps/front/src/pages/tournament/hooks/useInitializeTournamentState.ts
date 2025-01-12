import { ITournament } from '@tennis-stats/types';
import { useSetAtom } from 'jotai/index';
import { useEffect } from 'react';
import { updateTournamentStateAtom } from '../../../core/store';

function useInitializeTournamentState(tournament: ITournament | undefined) {
  const updateTournamentState = useSetAtom(updateTournamentStateAtom);

  useEffect(() => {
    if (!tournament) {
      return;
    }

    if (!tournament.tours.length) {
      updateTournamentState({
        selectedTournament: tournament,
        selectedTour: null,
        selectedMatch: null,
        selectedGameSet: null,
      });

      return;
    }

    updateTournamentState({
      selectedTournament: tournament,
    });
  }, [tournament]);
}

export default useInitializeTournamentState;
