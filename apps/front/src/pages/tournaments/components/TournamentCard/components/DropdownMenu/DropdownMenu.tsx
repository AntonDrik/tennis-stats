import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';
import React from 'react';
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

  const editTournament = (e: React.MouseEvent) => {
    e.stopPropagation();

    tournamentModal.open();
  };

  const deleteTournament = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size={'1'} variant={'ghost'} radius={'full'}>
          <VerticalDotsIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        <DropdownMenu.Item onClick={editTournament}>
          <EditIcon />
          Редактировать
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red" onClick={deleteTournament}>
          <TrashIcon />
          Удалить
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TournamentDropdownMenu;
