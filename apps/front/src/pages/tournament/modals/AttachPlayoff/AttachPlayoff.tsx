import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, Button, Dialog, Flex, ScrollArea, Spinner, Text } from '@radix-ui/themes';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { IUser } from '@tennis-stats/types';
import { useSetAtom } from 'jotai/index';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAttachPlayoffMutation, useGetLeaderboardQuery } from '../../../../core/api';
import {
  TextField,
  useModal,
  Spinner as LargeSpinner,
  PlayoffToggle,
} from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { Leaderboard } from '../../../../shared/components/Tournament';
import { getTextFieldError } from '../../../../utils';
import { tournamentActiveTabAtom } from '../../states/active-tab.state';
import usePlayoffActiveUsers from './hooks/usePlayoffActiveUsers';

interface IProps {
  tournamentId: number;
}

function AttachPlayoff(props: IProps) {
  const setActiveTab = useSetAtom(tournamentActiveTabAtom);

  const leaderboard = useGetLeaderboardQuery(props.tournamentId);
  const attachPlayoffMutation = useAttachPlayoffMutation(props.tournamentId);

  const [removedUsersIds, setRemovedUsersIds] = useState<number[]>([]);

  const modal = useModal();
  const activeUsers = usePlayoffActiveUsers(leaderboard.data, removedUsersIds);

  const form = useForm<CreatePlayoffDto>({
    mode: 'all',
    defaultValues: {
      setsCount: 2,
      activeUsersIds: [],
    },
    resolver: classValidatorResolver(CreatePlayoffDto),
  });

  const leaderboardItems = useMemo(() => {
    return leaderboard.data?.toursLeaderboard ?? [];
  }, [leaderboard.data?.toursLeaderboard]);

  const removeUserFromLeaderboard = useCallback((user: IUser) => {
    setRemovedUsersIds((prev) => [...prev, user.id]);
  }, []);

  const submit = (form: CreatePlayoffDto) => {
    attachPlayoffMutation.mutateAsync(form).then(() => {
      toast.success('Плей-офф успешно создан');
      setActiveTab('-1');

      modal.close();
    });
  };

  useEffect(() => {
    const usersIds = activeUsers.map((user) => user.id);

    form.setValue('activeUsersIds', usersIds, { shouldValidate: true });
  }, [activeUsers, form]);

  return (
    <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogCloseButton />

      <Dialog.Title>Добавить плей-офф к текущему турниру</Dialog.Title>

      <form onSubmit={form.handleSubmit(submit)}>
        <Flex direction={'column'} gap={'4'} mt={'6'}>
          <Flex direction={'column'} gap={'1'} mr={'-3'}>
            <Text size={'2'} weight={'medium'}>
              Таблица лидеров
            </Text>

            <ScrollArea scrollbars="vertical" style={{ maxHeight: '358px' }}>
              {leaderboard.isLoading && <LargeSpinner />}

              <Box pr={'3'}>
                <Leaderboard
                  leaderboardItems={leaderboardItems}
                  onlyTotal
                  hideUsersIds={removedUsersIds}
                  onRemove={removeUserFromLeaderboard}
                />
              </Box>
            </ScrollArea>
          </Flex>

          <TextField
            type={'number'}
            size={'3'}
            label={'Кол-во сетов для матча'}
            {...form.register('setsCount', { valueAsNumber: true })}
            {...getTextFieldError(form.formState.errors, 'setsCount')}
          />

          <Controller
            name={'stage'}
            control={form.control}
            render={({ field }) => <PlayoffToggle label={'Тип плейоффа'} {...field} />}
          />
        </Flex>

        <Flex justify={'end'} mt={'5'}>
          <Button
            variant={'solid'}
            type={'submit'}
            disabled={!form.formState.isValid || attachPlayoffMutation.isLoading}
          >
            {attachPlayoffMutation.isLoading && <Spinner />}
            Создать
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
}

export default AttachPlayoff;
