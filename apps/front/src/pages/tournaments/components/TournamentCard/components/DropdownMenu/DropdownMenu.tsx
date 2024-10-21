import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDeleteTournamentMutation } from '../../../../../../core/api';
import { useConfirmModal } from '../../../../../../shared/components';
import {
  EditIcon,
  TrashIcon,
  VerticalDotsIcon,
} from '../../../../../../shared/svg-icons';
import useUpsertTournamentModal from '../../../../hooks/useUpsertTournamentModal';

interface IProps {
  tournament: ITournament;
}

function TournamentDropdownMenu(props: IProps) {
  const tournamentModal = useUpsertTournamentModal(props.tournament.playersCount);
  const deleteTournament = useDeleteTournamentMutation();

  const deleteTournamentConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить турнир?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const editClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    tournamentModal.open();
  };

  const deleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteTournamentConfirmModal(() => {
      deleteTournament.mutateAsync().then(() => {
        toast.success('Турнир успешно удален');
      });
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size={'1'} variant={'ghost'} radius={'full'}>
          <VerticalDotsIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        <DropdownMenu.Item
          disabled={props.tournament.status !== ETournamentStatus.REGISTRATION}
          onClick={editClick}
        >
          <EditIcon />
          Редактировать
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red" onClick={deleteClick}>
          <TrashIcon />
          Удалить
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TournamentDropdownMenu;
