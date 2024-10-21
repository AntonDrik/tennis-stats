import React, { memo, MouseEvent } from 'react';
import { toast } from 'react-hot-toast';
import { useRemoveMatchMutation } from '../../../../../../core/api';
import { ITournamentState } from '../../../../../../core/store';
import { useConfirmModal } from '../../../../Modals';
import { Button, Flex, Separator } from '@radix-ui/themes';

interface IProps {
  tournamentState: ITournamentState;
}

function MatchCardControls(props: IProps) {
  const removeMatch = useRemoveMatchMutation(props.tournamentState);

  const match = props.tournamentState.selectedMatch;

  const confirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить матч?',
    description: 'Таблица лидеров будет пересчитана',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const handleRemoveMatch = (e: MouseEvent) => {
    e.stopPropagation();

    confirmModal(() => {
      removeMatch.mutateAsync().then(() => {
        toast.success('Матч успешно удален');
      });
    });
  };

  return (
    <React.Fragment>
      <Separator size={'4'} ml={'3'} style={{ backgroundColor: 'var(--sage-7)' }} />

      <Flex direction={'row'} gap={'4'} p={'3'} pt={'4'}>
        <Button color={'red'} onClick={handleRemoveMatch} disabled={match?.isFinished}>
          Удалить матч
        </Button>
      </Flex>
    </React.Fragment>
  );
}

export default memo(MatchCardControls, (a, b) => {
  return a.tournamentState.selectedMatch?.id === b.tournamentState.selectedMatch?.id;
});
