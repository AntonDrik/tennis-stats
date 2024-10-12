import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { tournamentAtom } from '../../../core/store';
import { useUserPermissions } from '../../../shared/hooks';

function useCanManageTournament(tournament?: ITournament) {
  const permissions = useUserPermissions();
  const tournamentState = useAtomValue(tournamentAtom);

  const activeTournament = tournamentState.selectedTournament ?? tournament;

  return useMemo(() => {
    if (!activeTournament) {
      return false;
    }

    return (
      permissions.canCrudTournament &&
      activeTournament.status !== ETournamentStatus.FINISHED
    );
  }, [permissions.canCrudTournament, activeTournament?.status]);
}

export default useCanManageTournament;
