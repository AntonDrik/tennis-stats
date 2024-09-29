import { UpsertTournamentDto } from '@tennis-stats/dto';
import { useModal } from '../../../shared/components';
import UpsertTournamentModal from '../modals/UpsertTournamentModal/UpsertTournamentModal';

function useUpsertTournamentModal(props?: UpsertTournamentDto) {
  const modal = useModal();

  return {
    open: () =>
      modal.open(<UpsertTournamentModal {...props} />, {
        maxWidth: 'xs',
      }),
  };
}

export default useUpsertTournamentModal;
