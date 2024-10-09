import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { Button, Dialog, Flex, SegmentedControl, Text } from '@radix-ui/themes';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useSwapUserOnMatchMutation } from '../../../../core/api';
import { tournamentAtom, updateTournamentAtom } from '../../../../core/store';
import { useModal } from '../../../../shared/components';
import { UsersSelect } from '../../../../shared/components/Inputs';
import { DialogCloseButton } from '../../../../shared/components/Modals';

function SwapUserModal() {
  const tournamentState = useAtomValue(tournamentAtom);
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const selectedMatch = tournamentState.selectedMatch;

  const swapUserMutation = useSwapUserOnMatchMutation(tournamentState);

  const [newUserId, setNewUserId] = useState<number>();
  const [currentUserId, setCurrentUserId] = useState<number | null>(
    selectedMatch?.user1.id ?? null
  );

  const modal = useModal();

  const handleSelect = (value: string) => {
    setCurrentUserId(Number(value));
  };

  const submit = () => {
    if (!Number.isFinite(newUserId) || !Number.isFinite(currentUserId)) {
      return;
    }

    swapUserMutation
      .mutateAsync({
        newUserId: Number(newUserId),
        currentUserId: Number(currentUserId),
      })
      .then((match) => {
        updateTournamentState({ selectedMatch: match });
        toast.success('Пользователь успешно заменен');
        modal.close();
      });
  };

  return (
    <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogCloseButton />

      <Dialog.Title>Заменить игрока</Dialog.Title>

      <Flex direction={'column'} mt={'1'} gap={'4'}>
        <Flex direction={'column'} gap={'1'} width={'100%'}>
          <Text size="2" weight={'medium'}>
            Выберите пользователя которого хотите заменить
          </Text>

          <SegmentedControl.Root
            size={'3'}
            defaultValue={String(selectedMatch?.user1.id)}
            onValueChange={handleSelect}
          >
            <SegmentedControl.Item value={String(selectedMatch?.user1.id) ?? ''}>
              {selectedMatch?.user1.nickname}
            </SegmentedControl.Item>

            <SegmentedControl.Item value={String(selectedMatch?.user2.id) ?? ''}>
              {selectedMatch?.user2.nickname}
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>

        <UsersSelect
          skipUsers={[selectedMatch?.user1, selectedMatch?.user2]}
          onChange={(user) => setNewUserId(user.id)}
        />

        <Flex justify={'end'}>
          <Button onClick={submit}>Заменить</Button>
        </Flex>
      </Flex>
    </Dialog.Content>
  );
}

export default SwapUserModal;
