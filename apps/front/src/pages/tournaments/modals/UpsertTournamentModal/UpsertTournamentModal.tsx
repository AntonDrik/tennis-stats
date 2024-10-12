import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button, Dialog, Flex, Spinner } from '@radix-ui/themes';
import { UpsertTournamentDto } from '@tennis-stats/dto';
import {
  useCreateTournamentMutation,
  useEditTournamentMutation,
} from '../../../../core/api';
import routes from '../../../../routes/routes';
import { appRoutes } from '../../../../routes/routes.constant';
import { TextField, useModal } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { getTextFieldError } from '../../../../utils';

function UpsertTournamentModal(props: Partial<UpsertTournamentDto>) {
  const createTournament = useCreateTournamentMutation();
  const updateTournament = useEditTournamentMutation();

  const modal = useModal();
  const form = useForm<UpsertTournamentDto>({
    mode: 'onChange',
    defaultValues: { playersCount: props.playersCount ?? 2 },
    resolver: classValidatorResolver(UpsertTournamentDto),
  });

  const isLoading = createTournament.isLoading || updateTournament.isLoading;
  const isUpdateModel = props.playersCount;

  const submit = (form: UpsertTournamentDto) => {
    if (!isUpdateModel) {
      createTournament.mutateAsync(form).then((tournament) => {
        modal.close();
        toast.success(`Турнир успешно создан`);
        void routes.navigate(appRoutes.TOURNAMENT_REGISTRATION);
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

          <Button size={'3'} type={'submit'} disabled={isLoading}>
            <Spinner loading={isLoading} />

            {!isUpdateModel ? 'Создать турнир' : 'Изменить турнир'}
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
}

export default UpsertTournamentModal;
