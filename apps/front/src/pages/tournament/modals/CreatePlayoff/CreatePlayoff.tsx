import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { IUser } from '@tennis-stats/types';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useCreatePlayoffMutation, useGetLeaderboardQuery } from '../../../../core/api';
import { useModal } from '../../../../shared/components';
import { Leaderboard } from '../../../../shared/components/Tournament';
import { getTextFieldError } from '../../../../utils';
import Styled from './CreatePlayoff.styles';
import usePlayoffActiveUsers from './hooks/usePlayoffActiveUsers';
import usePlayoffRoundValidator from './hooks/usePlayoffRoundValidator';

interface IProps {
  tournamentId: number;
}

function CreatePlayoff(props: IProps) {
  const leaderboard = useGetLeaderboardQuery(props.tournamentId);
  const createPlayoffMutation = useCreatePlayoffMutation();

  const [removedUsersIds, setRemovedUsersIds] = useState<number[]>([]);
  const [isOpenLeaderboard, setIsOpenLeaderboard] = useState<boolean>(false);

  const form = useForm<CreatePlayoffDto>({
    mode: 'all',
    defaultValues: {
      setsCount: 2,
      activeUsersIds: [],
    },
    resolver: classValidatorResolver(CreatePlayoffDto),
  });

  const modal = useModal();
  const activeUsers = usePlayoffActiveUsers(leaderboard.data, removedUsersIds);
  const isValidRound = usePlayoffRoundValidator(activeUsers);

  const removeUserFromLeaderboard = (user: IUser) => {
    setRemovedUsersIds((prev) => [...prev, user.id]);
  };

  const submit = (form: CreatePlayoffDto) => {
    console.log(form);

    createPlayoffMutation.mutateAsync(form).then(() => {
      toast.success('Плейофф успешно создан');
      modal.close();
    });
  };

  useEffect(() => {
    form.setValue(
      'activeUsersIds',
      activeUsers.map((user) => user.id),
      { shouldValidate: true }
    );
  }, [activeUsers]);

  return (
    <React.Fragment>
      <DialogTitle align={'center'}>Создать плейофф</DialogTitle>

      <form onSubmit={form.handleSubmit(submit)}>
        <DialogContent sx={{ pt: 0 }}>
          <Styled.LeaderboardContainer $isOpen={isOpenLeaderboard}>
            <Styled.LeaderboardButton
              $isOpen={isOpenLeaderboard}
              color={'primary'}
              variant={'contained'}
              size={'small'}
              fullWidth
              onClick={() => setIsOpenLeaderboard(!isOpenLeaderboard)}
            >
              Таблица лидеров
              <Styled.Arrow $isOpen={isOpenLeaderboard} />
            </Styled.LeaderboardButton>

            <Leaderboard
              leaderboardItems={leaderboard.data}
              onlyTotal
              tableHeight={'calc(100% - 40px)'}
              hideUsersIds={removedUsersIds}
              onRemove={removeUserFromLeaderboard}
            />
          </Styled.LeaderboardContainer>

          <Stack gap={2} mt={2}>
            <Controller
              name={'round'}
              control={form.control}
              render={({ field }) => (
                <ToggleButtonGroup size="small" fullWidth {...field}>
                  <ToggleButton value="1/8" disabled={!isValidRound('1/8')}>
                    1/8
                    {!isValidRound('1/8') && <Styled.Hint>Мало игроков</Styled.Hint>}
                  </ToggleButton>

                  <ToggleButton value="1/4" disabled={!isValidRound('1/4')}>
                    1/4
                    {!isValidRound('1/4') && <Styled.Hint>Мало игроков</Styled.Hint>}
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />

            <TextField
              fullWidth
              size={'small'}
              type={'number'}
              label={'Кол-во сетов для матча'}
              {...form.register('setsCount', { valueAsNumber: true })}
              {...getTextFieldError(form.formState.errors, 'setsCount')}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button type={'submit'} variant={'contained'} disabled={!form.formState.isValid}>
            Создать
          </Button>
        </DialogActions>
      </form>
    </React.Fragment>
  );
}

export default CreatePlayoff;
