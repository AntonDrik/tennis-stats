import { MouseEvent, useMemo } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useAtomValue } from 'jotai';
import { toast } from 'react-hot-toast';
import { useRemoveMatchMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import SwapUserModal from '../../../../pages/tournament/modals/SwapUser/SwapUserModal';
import { useConfirmModal, useModal } from '../../Modals';

function MatchCardControls() {
  const tournamentState = useAtomValue(tournamentAtom);

  const removeMatch = useRemoveMatchMutation(tournamentState);

  const modal = useModal();
  const confirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить матч?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const isMatchFinished = useMemo(() => {
    return tournamentState.selectedMatch?.gameSets.every(
      (gameSet) => gameSet.isFinished
    );
  }, [tournamentState.selectedMatch?.gameSets]);

  const movePlayer = (e: MouseEvent) => {
    e.stopPropagation();

    modal.open(<SwapUserModal />, { maxWidth: 'sm' });
  };

  const handleRemoveMatch = (e: MouseEvent) => {
    e.stopPropagation();

    confirmModal(() => {
      removeMatch.mutateAsync().then(() => {
        toast.success('Матч успешно удален');
      });
    });
  };

  return (
    <Stack direction={'row'} gap={2} p={2} pt={1}>
      {!isMatchFinished && (
        <Button variant={'contained'} size={'small'} onClick={movePlayer}>
          Заменить Игрока
        </Button>
      )}

      <Button
        variant={'contained'}
        size={'small'}
        color={'error'}
        onClick={handleRemoveMatch}
      >
        Удалить матч
      </Button>
    </Stack>
  );
}

export default MatchCardControls;
