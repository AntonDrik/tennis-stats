import { useModal } from '../../../shared/components';
import UpsertTournamentModal from '../modals/UpsertTournamentModal/UpsertTournamentModal';

function useUpsertTournamentModal(playersCount?: number) {
  const modal = useModal();

  return {
    open: () => modal.open(<UpsertTournamentModal playersCount={playersCount} />),
  };
}

export default useUpsertTournamentModal;
