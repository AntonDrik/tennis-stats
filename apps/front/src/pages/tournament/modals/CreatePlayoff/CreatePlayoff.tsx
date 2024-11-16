import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  Box,
  Button,
  Dialog,
  Flex,
  ScrollArea,
  SegmentedControl,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { CreatePlayoffDto } from '@tennis-stats/dto';
import { IUser } from '@tennis-stats/types';
import { useSetAtom } from 'jotai/index';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useCreatePlayoffMutation, useGetLeaderboardQuery } from '../../../../core/api';
import {
  TextField,
  useModal,
  Spinner as LargeSpinner,
} from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { Leaderboard } from '../../../../shared/components/Tournament';
import { getTextFieldError } from '../../../../utils';
import { tournamentActiveTabAtom } from '../../states/active-tab.state';
import { leaderboardTabAtom } from '../LeaderboardModal/LeaderboardModal.state';
import usePlayoffActiveUsers from './hooks/usePlayoffActiveUsers';

interface IProps {
  tournamentId: number;
}

function CreatePlayoff(props: IProps) {
  const setLeaderboardTab = useSetAtom(leaderboardTabAtom);
  const setActiveTab = useSetAtom(tournamentActiveTabAtom);

  const leaderboard = useGetLeaderboardQuery(props.tournamentId);
  const createPlayoffMutation = useCreatePlayoffMutation(props.tournamentId);

  const [removedUsersIds, setRemovedUsersIds] = useState<number[]>([]);

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

  const removeUserFromLeaderboard = (user: IUser) => {
    setRemovedUsersIds((prev) => [...prev, user.id]);
  };

  const submit = (form: CreatePlayoffDto) => {
    createPlayoffMutation.mutateAsync(form).then(() => {
      toast.success('Плей-офф успешно создан');
      setLeaderboardTab('playoff');
      setActiveTab('-1');

      modal.close();
    });
  };

  useEffect(() => {
    form.setValue(
      'activeUsersIds',
      activeUsers.map((user) => user.id),
      { shouldValidate: true }
    );
  }, [activeUsers, form]);

  return (
    <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogCloseButton />

      <Dialog.Title>Создать плей-офф</Dialog.Title>

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
                  leaderboardItems={leaderboard.data?.toursLeaderboard}
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
            render={({ field }) => (
              <SegmentedControl.Root
                size={'3'}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SegmentedControl.Item value="1/8">1/8</SegmentedControl.Item>
                <SegmentedControl.Item value="1/4">1/4</SegmentedControl.Item>
              </SegmentedControl.Root>
            )}
          />
        </Flex>

        <Flex justify={'end'} mt={'5'}>
          <Button
            variant={'solid'}
            type={'submit'}
            disabled={!form.formState.isValid || createPlayoffMutation.isLoading}
          >
            {createPlayoffMutation.isLoading && <Spinner />}
            Создать
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
}

export default CreatePlayoff;
