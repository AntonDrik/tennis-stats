import { Chip } from '@mui/material';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useCallback } from 'react';

interface IProps {
  tournament: ITournament;
}

function TournamentStatusChip({ tournament }: IProps) {
  const getStatusChip = useCallback(() => {
    if (tournament.status === ETournamentStatus.REGISTRATION) {
      return <Chip label={'Регистрация'} color={'warning'} size={'small'} />;
    }

    if (tournament.status === ETournamentStatus.ACTIVE) {
      return <Chip label={'Активный'} color={'info'} size={'small'} />;
    }

    if (tournament.status === ETournamentStatus.CANCELLED) {
      return <Chip label={'Отменён'} color={'error'} size={'small'} />;
    }

    return <Chip label={'Завершен'} color={'success'} size={'small'} />;
  }, [tournament.status]);

  return getStatusChip();
}

export default TournamentStatusChip;
