import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { Button, Callout, Dialog, Flex } from '@radix-ui/themes';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useAddUserOnTournamentMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { useModal } from '../../../../shared/components';
import { UsersSelect } from '../../../../shared/components/Inputs';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { InfoIcon } from '../../../../shared/svg-icons';

function AddUserModal() {
  const tournamentState = useAtomValue(tournamentAtom);

  const addUserMutation = useAddUserOnTournamentMutation(tournamentState);

  const [newUserId, setNewUserId] = useState<number>();

  const modal = useModal();

  const joinedUsers = tournamentState.selectedTournament?.registeredUsers ?? [];

  const submit = () => {
    if (!newUserId) {
      return;
    }

    addUserMutation.mutateAsync({ id: newUserId }).then(() => {
      toast.success('Пользователь успешно добавлен');
      modal.close();
    });
  };

  return (
    <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogCloseButton />

      <Dialog.Title>Добавить игрока</Dialog.Title>

      <Callout.Root color="blue" size={'1'} mb={'4'}>
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>

        <Callout.Text>
          При наличии "Халявы" она будет заменена новым игроком во всех раундах
        </Callout.Text>
      </Callout.Root>

      <Flex direction={'column'} mt={'1'} gap={'4'}>
        <UsersSelect
          skipUsers={joinedUsers}
          disableSkippedUsers
          onChange={(user) => setNewUserId(user.id)}
        />

        <Flex justify={'end'}>
          <Button onClick={submit}>Добавить</Button>
        </Flex>
      </Flex>
    </Dialog.Content>
  );
}

export default AddUserModal;
