import { Badge } from '@radix-ui/themes';
import { ETournamentStatus } from '@tennis-stats/types';
import { useCallback } from 'react';

interface IProps {
  status: ETournamentStatus;
}

function TournamentStatusChip({ status }: IProps) {
  const getStatusChip = useCallback(() => {
    if (status === ETournamentStatus.REGISTRATION) {
      return <Badge color="orange">Регистрация</Badge>;
    }

    if (status === ETournamentStatus.PLAYOFF) {
      return <Badge color="purple">Плей-офф</Badge>;
    }

    if (status === ETournamentStatus.ACTIVE) {
      return <Badge color="blue">Активный</Badge>;
    }

    return <Badge color="green">Завершен</Badge>;
  }, [status]);

  return getStatusChip();
}

export default TournamentStatusChip;
