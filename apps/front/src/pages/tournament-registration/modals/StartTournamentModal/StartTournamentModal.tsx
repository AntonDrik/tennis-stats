import Divider from '@mui/material/Divider';
import React from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  DialogActions,
  DialogContent,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { StartTournamentDto } from '@tennis-stats/dto';
import { ETourGenerator, IUser } from '@tennis-stats/types';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useStartTournamentMutation from '../../../../core/api/tournamentApi/useStartTournamentMutation';
import { AndroidSwitch, useModal } from '../../../../shared/components';
import { GroupBox } from '../../../../shared/components/GroupBox/GroupBox';

import Styled from './StartTournamentModal.styles';

interface IProps {
  registeredUsers: IUser[];
  onSuccess?: (tournamentId: number) => void;
}

function StartTournamentModal(props: IProps) {
  const modal = useModal();

  const startTournament = useStartTournamentMutation();

  const form = useForm<StartTournamentDto>({
    mode: 'onChange',
    defaultValues: {
      registeredUsersIds: props.registeredUsers.map((user) => user.id),
      handleRating: true,
      tours: [],
    },
    resolver: classValidatorResolver(StartTournamentDto),
  });

  const toursControl = useFieldArray({
    control: form.control,
    name: 'tours',
  });

  const isLastRow = (index: number) => index === toursControl.fields.length - 1;

  const addTour = () => {
    toursControl.append({
      setsCount: 1,
      pairsGenerator: ETourGenerator.RANDOM,
    });
  };

  const submit = (form: StartTournamentDto) => {
    startTournament.mutateAsync(form).then((tournament) => {
      modal.close();
      toast.success('Турнир успешно создан');
      props.onSuccess?.(tournament.id);
    });
  };

  return (
    <>
      <DialogTitle variant={'h3'} textAlign={'center'}>
        Настройте турнир
      </DialogTitle>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <GroupBox caption={'Глобальные настройки'} bgcolor={'white'}>
              <Controller
                name="handleRating"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label="Считать рейтинг"
                    control={
                      <AndroidSwitch checked={value} onChange={onChange} />
                    }
                  />
                )}
              />
            </GroupBox>

            <GroupBox caption={'Настройки туров'} bgcolor={'white'} pt={3}>
              <Stack gap={2}>
                {toursControl.fields.map((field, index) => (
                  <React.Fragment key={`tour-${index}`}>
                    <Styled.TourRow
                      key={field.id}
                      mb={isLastRow(index) ? 2 : 0}
                    >
                      <Typography textAlign={'start'} minWidth={65}>
                        Тур № {index + 1}
                      </Typography>

                      <TextField
                        fullWidth
                        size={'small'}
                        type={'number'}
                        label={'Кол-во сетов'}
                        {...form.register(`tours.${index}.setsCount`, {
                          valueAsNumber: true,
                        })}
                      />

                      <Controller
                        name={`tours.${index}.pairsGenerator`}
                        control={form.control}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size={'small'}
                            select
                            label={'Генерация матчей'}
                            {...field}
                          >
                            <MenuItem value={0}>Рандом</MenuItem>
                          </TextField>
                        )}
                      />

                      <IconButton onClick={() => toursControl.remove(index)}>
                        <DeleteForeverIcon color={'error'} />
                      </IconButton>
                    </Styled.TourRow>

                    {index !== toursControl.fields.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Stack>

              <Button
                variant={'contained'}
                color={'success'}
                sx={{ minWidth: 40, width: 40 }}
                onClick={addTour}
              >
                <AddIcon />
              </Button>
            </GroupBox>
          </DialogContent>

          <DialogActions>
            <Button variant={'contained'} type={'submit'}>
              Создать турнир
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </>
  );
}

export default StartTournamentModal;
