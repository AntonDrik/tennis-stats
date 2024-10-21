import { Badge } from '@radix-ui/themes';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useCallback } from 'react';

interface IProps {
  tournament: ITournament;
}

function TournamentStatusChip({ tournament }: IProps) {
  const getStatusChip = useCallback(() => {
    if (tournament.status === ETournamentStatus.REGISTRATION) {
      return <Badge color="orange">Регистрация</Badge>;
    }

    if (tournament.status === ETournamentStatus.PLAYOFF) {
      return <Badge color="purple">Плей-офф</Badge>;
    }

    if (tournament.status === ETournamentStatus.ACTIVE) {
      return <Badge color="blue">Активный</Badge>;
    }

    return <Badge color="green">Завершен</Badge>;
  }, [tournament.status]);

  return getStatusChip();
}

export default TournamentStatusChip;
