import { IMatch } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { meAtom } from '../../../../../core/store';
import { useCanManageTournament } from '../../../../../pages/tournament/hooks';

function useCanChangeGameSet(match: IMatch) {
  const me = useAtomValue(meAtom);
  const canManageTournament = useCanManageTournament();

  return canManageTournament || match.user1?.id === me?.id || match.user2?.id === me?.id;
}

export default useCanChangeGameSet;
