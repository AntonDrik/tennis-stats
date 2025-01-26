import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { ISeasonWithStats } from '@tennis-stats/types';
import React, { MouseEvent } from 'react';
import { useConfirmModal, useModal } from '../../../../shared/components';
import ExtendSeasonModal from '../../modals/ExtendSeasonModal/ExtendSeasonModal';
import { useDeleteSeasonMutation, useFinishSeasonMutation } from '../../../../core/api';
import {
  CheckCircleIcon,
  EditIcon,
  TrashIcon,
  VerticalDotsIcon,
} from '../../../../shared/svg-icons';

interface IProps {
  season: ISeasonWithStats;
}

function SeasonActionsMenu(props: IProps) {
  const deleteSeasonMutation = useDeleteSeasonMutation();
  const finishSeasonMutation = useFinishSeasonMutation();

  const modal = useModal();

  const finishSeasonConfirm = useConfirmModal({
    title: 'Вы действительно хотите завершить сезон?',
    confirmTitle: 'Да, завершить',
    denyTitle: 'Нет, отменить',
    confirmButtonProps: { color: 'green' },
  });

  const deleteSeasonConfirm = useConfirmModal({
    title: 'Вы действительно хотите удалить сезон?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
    confirmButtonProps: { color: 'green' },
  });

  const finishSeason = (e: MouseEvent) => {
    e.stopPropagation();

    finishSeasonConfirm(() => {
      void finishSeasonMutation.mutateAsync(props.season.id);
    });
  };

  const extendSeason = (e: MouseEvent) => {
    e.stopPropagation();

    modal.open(<ExtendSeasonModal season={props.season} />);
  };

  const deleteSeason = (e: MouseEvent) => {
    e.stopPropagation();

    deleteSeasonConfirm(() => {
      void deleteSeasonMutation.mutateAsync(props.season.id);
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant={'ghost'} color={'gray'} size={'1'}>
          <VerticalDotsIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        <DropdownMenu.Item color={'green'} onClick={finishSeason}>
          <CheckCircleIcon />
          Завершить сезон
        </DropdownMenu.Item>

        <DropdownMenu.Item onClick={extendSeason}>
          <EditIcon />
          Продлить сезон
        </DropdownMenu.Item>

        <DropdownMenu.Item color={'red'} onClick={deleteSeason}>
          <TrashIcon />
          Удалить сезон
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default SeasonActionsMenu;
