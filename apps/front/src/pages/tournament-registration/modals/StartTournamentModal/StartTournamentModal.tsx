import {
  Button,
  Dialog,
  Flex,
  Select as RadixSelect,
  Switch,
  Text,
  Spinner,
} from '@radix-ui/themes';
import React from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { StartTournamentDto } from '@tennis-stats/dto';
import { ETourGenerator } from '@tennis-stats/types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useStartTournamentMutation } from '../../../../core/api';
import { Select, TextField, useModal } from '../../../../shared/components';
import { GroupBox } from '../../../../shared/components/GroupBox/GroupBox';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { useMediaQuery } from '../../../../shared/hooks';

import Styled from './StartTournamentModal.styles';

interface IProps {
  tournamentId: number;
  onSuccess?: (tournamentId: number) => void;
}

function StartTournamentModal(props: IProps) {
  const startTournament = useStartTournamentMutation(props.tournamentId);

  const modal = useModal();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const form = useForm<StartTournamentDto>({
    mode: 'onChange',
    defaultValues: {
      handleRating: true,
      setsCount: 1,
      pairsGenerator: ETourGenerator.BY_RATING,
    },
    resolver: classValidatorResolver(StartTournamentDto),
  });

  const submit = (form: StartTournamentDto) => {
    startTournament.mutateAsync(form).then((tournament) => {
      modal.close();
      toast.success('Турнир успешно создан');
      props.onSuccess?.(tournament.id);
    });
  };

  return (
    <Dialog.Content
      maxWidth={'570px'}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <DialogCloseButton />

      <Dialog.Title mb={'6'}>Настройте турнир</Dialog.Title>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Flex direction={'column'} gap={'5'}>
            <GroupBox caption={'Глобальные настройки'} bgcolor={'var(--accent-1)'}>
              <Controller
                name="handleRating"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Switch size="2" checked={value} onCheckedChange={onChange} />
                      Считать рейтинг
                    </Flex>
                  </Text>
                )}
              />
            </GroupBox>

            <GroupBox caption={'Настройки туров'} bgcolor={'var(--accent-1)'}>
              <Styled.TourRow mb={'2'} gap={!isMobileDevice ? '4' : '2'}>
                <Flex align={'center'}>
                  <Text align={'left'} mb={!isMobileDevice ? '2' : '0'} wrap={'nowrap'}>
                    Тур № 1
                  </Text>
                </Flex>

                <TextField
                  size={'3'}
                  type={'number'}
                  label={'Кол-во сетов'}
                  {...form.register('setsCount', {
                    valueAsNumber: true,
                  })}
                />

                <Controller
                  name={'pairsGenerator'}
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      label={'Генерация матчей'}
                      size={'3'}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <RadixSelect.Trigger />

                      <RadixSelect.Content position="popper">
                        <RadixSelect.Item value={ETourGenerator.RANDOM}>
                          Рандом
                        </RadixSelect.Item>

                        <RadixSelect.Item value={ETourGenerator.BY_RATING}>
                          По рейтингу
                        </RadixSelect.Item>
                      </RadixSelect.Content>
                    </Select>
                  )}
                />
              </Styled.TourRow>
            </GroupBox>

            <Button
              variant={'solid'}
              type={'submit'}
              style={{ width: 200, alignSelf: 'flex-end' }}
              disabled={!form.formState.isValid || startTournament.isLoading}
            >
              {startTournament.isLoading && <Spinner />}
              Создать турнир
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

export default StartTournamentModal;
