import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { UpsertTournamentDto } from '@tennis-stats/dto';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useCreateTournamentMutation, useEditTournamentMutation } from '../../../../core/api';
import { Spinner, useModal } from '../../../../shared/components';

function UpsertTournamentModal(props: Partial<UpsertTournamentDto>) {
  const createTournament = useCreateTournamentMutation();
  const updateTournament = useEditTournamentMutation();

  const modal = useModal();

  const [playersCount, setPlayersCount] = useState(2);

  const isLoading = createTournament.isLoading || updateTournament.isLoading;
  const isUpdateModel = props.playersCount;
  const isError = playersCount < 2 || playersCount > 30;

  const submit = () => {
    const request = { playersCount: Number(playersCount) };

    if (!isUpdateModel) {
      createTournament.mutateAsync(request).then(() => {
        modal.close();
        toast.success(`Турнир успешно создан`);
      });

      return;
    }

    updateTournament.mutateAsync(request).then(() => {
      modal.close();
      toast.success(`Турнир успешно изменен`);
    });
  };

  useEffect(() => {
    if (isUpdateModel) {
      setPlayersCount(Number(props.playersCount));
    }
  }, [isUpdateModel]);

  return (
    <>
      {isLoading && <Spinner />}

      <DialogTitle>{!isUpdateModel ? 'Создать' : 'Изменить'} турнир</DialogTitle>

      <Stack p={2}>
        <TextField
          fullWidth
          type={'number'}
          label={'Количество участников'}
          placeholder={'Количество участников'}
          value={playersCount}
          error={isError}
          helperText={isError ? 'Минимум 3. Максимум 20' : null}
          onChange={(e) => setPlayersCount(Number(e.target.value))}
        />

        <Box mt={2}>
          <Button fullWidth variant={'contained'} onClick={submit}>
            {!isUpdateModel ? 'Создать турнир и начать регистрацию' : 'Изменить турнир'}
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default UpsertTournamentModal;
