import { MouseEvent } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-hot-toast';
import { useRemoveMatchMutation } from '../../../../../core/api';
import { tournamentAtom } from '../../../../../core/store';
import { useConfirmModal } from '../../../Modals';
import { Button, Flex } from '@radix-ui/themes';

function MatchCardControls() {
  const tournamentState = useAtomValue(tournamentAtom);

  const removeMatch = useRemoveMatchMutation(tournamentState);

  // const modal = useModal();
  const confirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить матч?',
    description: 'Таблица лидеров будет пересчитана',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  // const movePlayer = (e: MouseEvent) => {
  //   e.stopPropagation();
  //
  //   modal.open(<SwapUserModal />);
  // };

  const handleRemoveMatch = (e: MouseEvent) => {
    e.stopPropagation();

    confirmModal(() => {
      removeMatch.mutateAsync().then(() => {
        toast.success('Матч успешно удален');
      });
    });
  };

  return (
    <Flex direction={'row'} gap={'4'} p={'3'} pt={'4'}>
      {/*{!tournamentState.selectedMatch?.isFinished && (*/}
      {/*  <Button onClick={movePlayer}>Заменить Игрока</Button>*/}
      {/*)}*/}

      <Button color={'red'} onClick={handleRemoveMatch}>
        Удалить матч
      </Button>
    </Flex>
  );
}

export default MatchCardControls;
