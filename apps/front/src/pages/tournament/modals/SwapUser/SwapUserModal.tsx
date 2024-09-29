import { DialogActions, DialogContent, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useSwapUserOnMatchMutation } from '../../../../core/api';
import { tournamentAtom, updateTournamentAtom } from '../../../../core/store';
import { useModal } from '../../../../shared/components';
import { UsersSelect } from '../../../../shared/components/Inputs';

function SwapUserModal() {
  const tournamentState = useAtomValue(tournamentAtom);
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const selectedMatch = tournamentState.selectedMatch;

  const swapUserMutation = useSwapUserOnMatchMutation(tournamentState);

  const [newUserId, setNewUserId] = useState<number>();
  const [currentUserId, setCurrentUserId] = useState<number>();

  const modal = useModal();

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentUserId(Number(event.target.value));
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
    <>
      <DialogTitle textAlign={'center'}>Заменить игрока</DialogTitle>

      <DialogContent>
        <Stack mt={1} gap={3}>
          <TextField
            select
            size={'small'}
            label={'Выберите пользователя которого хотите заменить'}
            onChange={handleSelect}
          >
            <MenuItem value={selectedMatch?.user1.id}>
              {selectedMatch?.user1.nickname}
            </MenuItem>

            <MenuItem value={selectedMatch?.user2.id}>
              {selectedMatch?.user2.nickname}
            </MenuItem>
          </TextField>

          <UsersSelect
            skipUsers={[selectedMatch?.user1, selectedMatch?.user2]}
            onChange={(user) => setNewUserId(user.id)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant={'contained'} onClick={submit}>
          Заменить
        </Button>
      </DialogActions>
    </>
  );
}

export default SwapUserModal;
