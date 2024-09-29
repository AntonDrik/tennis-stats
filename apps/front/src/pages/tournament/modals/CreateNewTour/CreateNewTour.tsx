import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { DialogActions, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { CreateTourDto } from '@tennis-stats/dto';
import { ETourGenerator } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAddTourMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { Spinner, useModal } from '../../../../shared/components';
import { getTextFieldError } from '../../../../utils';

function CreateNewTour() {
  const tournamentState = useAtomValue(tournamentAtom);

  const addTourMutation = useAddTourMutation(
    tournamentState.selectedTournament?.id
  );

  const form = useForm<CreateTourDto>({
    mode: 'onChange',
    defaultValues: {
      setsCount: 1,
      pairsGenerator: ETourGenerator.RANDOM,
    },
    resolver: classValidatorResolver(CreateTourDto),
  });

  const modal = useModal();

  const submit = (form: CreateTourDto) => {
    addTourMutation.mutateAsync(form).then(() => {
      modal.close();
      toast.success('Тур успешно добавлен');
    });
  };

  return (
    <>
      {addTourMutation.isLoading && <Spinner />}

      <DialogTitle textAlign={'center'}>Добавить тур</DialogTitle>

      <form onSubmit={form.handleSubmit(submit)}>
        <DialogContent>
          <Stack direction={'row'} gap={2} mt={1}>
            <TextField
              fullWidth
              size={'small'}
              type={'number'}
              label={'Кол-во сетов'}
              {...form.register('setsCount', { valueAsNumber: true })}
              {...getTextFieldError(form.formState.errors, 'setsCount')}
            />

            <Controller
              name={`pairsGenerator`}
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size={'small'}
                  select
                  label={'Генерация пар'}
                  {...field}
                >
                  <MenuItem value={0}>Рандом</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant={'contained'} size={'small'} type={'submit'}>
            Добавить
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

export default CreateNewTour;
