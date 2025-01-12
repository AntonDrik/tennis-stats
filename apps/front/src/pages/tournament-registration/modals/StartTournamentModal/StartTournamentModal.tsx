import {
  Button,
  Dialog,
  Flex,
  Select as RadixSelect,
  Switch,
  Spinner,
} from '@radix-ui/themes';
import React, { useMemo } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { StartTournamentDto } from '@tennis-stats/dto';
import { ETournamentType, ITournament } from '@tennis-stats/types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useStartTournamentMutation } from '../../../../core/api';
import { Select, TextField, useModal } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import PlayoffSettings from './components/PlayoffSettings/PlayoffSettings';

interface IProps {
  tournament: ITournament;
  onSuccess?: (tournamentId: number) => void;
}

function StartTournamentModal(props: IProps) {
  const startTournament = useStartTournamentMutation(props.tournament.id);

  const modal = useModal();

  const form = useForm<StartTournamentDto>({
    mode: 'onChange',
    defaultValues: {
      handleRating: true,
      setsCount: 1,
      tournamentType: ETournamentType.SWISS_SYSTEM,
    },
    resolver: classValidatorResolver(StartTournamentDto),
  });

  const tournamentType = form.watch('tournamentType');

  const conditionalForm = useMemo(() => {
    return {
      [ETournamentType.ROUND_ROBIN]: null,
      [ETournamentType.SWISS_SYSTEM]: null,
      [ETournamentType.PLAYOFF]: <PlayoffSettings tournament={props.tournament} />,
    };
  }, [props.tournament]);

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
          <Flex direction={'column'} gap={'4'}>
            <Flex direction={'column'} gap={'3'}>
              <Controller
                name="handleRating"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <Flex gap="2">
                    <Switch size="2" checked={value} onCheckedChange={onChange} />
                    Считать рейтинг
                  </Flex>
                )}
              />

              <Controller
                name={'tournamentType'}
                control={form.control}
                render={({ field }) => (
                  <Select
                    label={'Тип турнира'}
                    size={'3'}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <RadixSelect.Trigger />

                    <RadixSelect.Content position="popper">
                      <RadixSelect.Item value={ETournamentType.SWISS_SYSTEM}>
                        Швейцарская система
                      </RadixSelect.Item>

                      <RadixSelect.Item value={ETournamentType.ROUND_ROBIN}>
                        Круговая система (Макс.{' '}
                        {(props.tournament.registeredUsers.length || 1) - 1} туров)
                      </RadixSelect.Item>

                      <RadixSelect.Item value={ETournamentType.PLAYOFF}>
                        Сетка плейофф
                      </RadixSelect.Item>
                    </RadixSelect.Content>
                  </Select>
                )}
              />

              <TextField
                size={'3'}
                type={'number'}
                label={'Кол-во сетов'}
                {...form.register('setsCount', { valueAsNumber: true })}
              />

              {conditionalForm[tournamentType]}
            </Flex>

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
