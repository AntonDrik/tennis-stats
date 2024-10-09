import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, Dialog, Flex, Spinner } from '@radix-ui/themes';
import { UpsertTournamentDto } from '@tennis-stats/dto';
import { useNavigate } from 'react-router-dom';
import {
  useCreateTournamentMutation,
  useEditTournamentMutation,
} from '../../../../core/api';
import routes from '../../../../routes/routes';
import { appRoutes } from '../../../../routes/routes.constant';
import { TextField, useModal } from '../../../../shared/components';

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
      createTournament.mutateAsync(request).then((tournament) => {
        modal.close();
        toast.success(`Турнир успешно создан`);
        void routes.navigate(appRoutes.TOURNAMENT_BY_ID(tournament.id));
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
    <Dialog.Content maxWidth="350px">
      <Dialog.Title>{!isUpdateModel ? 'Создать' : 'Изменить'} турнир</Dialog.Title>

      <Flex direction={'column'} gap={'4'}>
        <TextField
          type={'number'}
          size={'3'}
          label={'Количество участников'}
          placeholder={'Количество участников'}
          value={playersCount}
          error={isError}
          helperText={isError ? 'Минимум 3. Максимум 20' : null}
          onChange={(e) => setPlayersCount(Number(e.target.value))}
        />

        <Button size={'3'} onClick={submit} disabled={isLoading}>
          <Spinner loading={isLoading} />

          {!isUpdateModel ? 'Создать турнир' : 'Изменить турнир'}
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default UpsertTournamentModal;
