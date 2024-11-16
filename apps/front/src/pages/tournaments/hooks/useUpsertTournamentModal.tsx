import { ITournament } from '@tennis-stats/types';
import { useModal } from '../../../shared/components';
import UpsertTournamentModal from '../modals/UpsertTournamentModal/UpsertTournamentModal';

function useUpsertTournamentModal(tournament?: ITournament) {
  const modal = useModal();

  return {
    open: () => modal.open(<UpsertTournamentModal tournament={tournament} />),
  };
}

export default useUpsertTournamentModal;
