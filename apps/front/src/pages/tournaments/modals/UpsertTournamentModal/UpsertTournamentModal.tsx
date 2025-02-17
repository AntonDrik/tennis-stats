import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ITournament } from '@tennis-stats/types';
import { format } from 'date-fns/format';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { ru } from 'date-fns/locale';
import { useMemo } from 'react';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  Callout,
  Dialog,
  Flex,
  Spinner,
  Strong,
  Switch,
  Text,
} from '@radix-ui/themes';
import { UpsertTournamentDto } from '@tennis-stats/dto';
import {
  useCreateTournamentMutation,
  useEditTournamentMutation,
  useGetActiveSeasonQuery,
} from '../../../../core/api';
import routes from '../../../../routes/routes';
import { appRoutes } from '../../../../routes/routes.constant';
import { TextField, useModal, useGetSeasonDateCaption } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { InfoIcon } from '../../../../shared/svg-icons';
import { getTextFieldError } from '../../../../utils';

export interface IProps {
  tournament?: ITournament;
}

function UpsertTournamentModal(props?: IProps) {
  const activeSeason = useGetActiveSeasonQuery();
  const createTournament = useCreateTournamentMutation();
  const updateTournament = useEditTournamentMutation(props?.tournament?.id);

  const modal = useModal();
  const getSeasonDateCaption = useGetSeasonDateCaption();

  const form = useForm<UpsertTournamentDto>({
    mode: 'onChange',
    defaultValues: {
      playersCount: props?.tournament?.playersCount ?? 20,
      attachSeason: !props?.tournament ? true : Boolean(props.tournament.season),
    },
    resolver: classValidatorResolver(UpsertTournamentDto),
  });

  const isUpdateModel = Boolean(props?.tournament);
  const isLoading = createTournament.isLoading || updateTournament.isLoading;
  const attachSeason = form.watch('attachSeason');

  const isInvalidSeason = useMemo(() => {
    if (!activeSeason.data) {
      return false;
    }

    return !isWithinInterval(new Date(), {
      start: activeSeason.data.startDate,
      end: activeSeason.data.endDate,
    });
  }, [activeSeason.data]);

  const submit = (form: UpsertTournamentDto) => {
    if (!isUpdateModel) {
      createTournament.mutateAsync(form).then((tournament) => {
        modal.close();
        toast.success(`Турнир успешно создан`);
        void routes.navigate(appRoutes.TOURNAMENT_REGISTRATION(tournament.id));
      });

      return;
    }

    updateTournament.mutateAsync(form).then(() => {
      modal.close();
      toast.success(`Турнир успешно изменен`);
    });
  };

  return (
    <Dialog.Content maxWidth="350px" onOpenAutoFocus={(event) => event.preventDefault()}>
      <DialogCloseButton />

      <Dialog.Title>{!isUpdateModel ? 'Создать' : 'Изменить'} турнир</Dialog.Title>
      <Box mb={'4'}>
        <Text>
          Дата проведения: <Strong>{format(new Date(), 'dd LLLL yyyy', { locale: ru })}</Strong>
        </Text>
      </Box>

      <form onSubmit={form.handleSubmit(submit)}>
        <Flex direction={'column'} gap={'4'}>
          <TextField
            size={'3'}
            type={'number'}
            label={'Количество участников'}
            placeholder={'Количество участников'}
            {...form.register(`playersCount`, {
              valueAsNumber: true,
            })}
            {...getTextFieldError(form.formState.errors, 'playersCount')}
          />

          {activeSeason.data && (
            <Controller
              name="attachSeason"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <Flex gap="2">
                  <Switch size="2" checked={value} onCheckedChange={onChange} />
                  Сезон [{getSeasonDateCaption(activeSeason.data)}]
                </Flex>
              )}
            />
          )}

          {attachSeason && !isInvalidSeason && (
            <Controller
              name="seasonFinal"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <Text as="label">
                  <Flex gap="2">
                    <Switch size="2" checked={value} onCheckedChange={onChange} />
                    Финальный турнир сезона
                  </Flex>
                </Text>
              )}
            />
          )}

          {attachSeason && isInvalidSeason && (
            <Callout.Root color="orange">
              <Callout.Icon>
                <InfoIcon />
              </Callout.Icon>
              <Callout.Text>
                Дата турнира не в пределах сезона
                <Strong> {getSeasonDateCaption(activeSeason.data, true)}</Strong>. Отредактируйте
                или завершите текущий сезон
              </Callout.Text>
            </Callout.Root>
          )}

          <Button
            size={'3'}
            type={'submit'}
            disabled={isLoading || (attachSeason && isInvalidSeason)}
          >
            <Spinner loading={isLoading} />

            {!isUpdateModel ? 'Создать турнир' : 'Изменить турнир'}
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
}

export default UpsertTournamentModal;
