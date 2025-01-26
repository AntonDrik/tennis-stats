import { Badge, Flex } from '@radix-ui/themes';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useCallback } from 'react';

interface IProps {
  tournament: ITournament;
}

function TournamentInfoChips(props: IProps) {
  const { tournament } = props;

  const getStatusChip = useCallback(() => {
    if (tournament.status === ETournamentStatus.REGISTRATION) {
      return <Badge color="orange">Регистрация</Badge>;
    }

    if (tournament.status === ETournamentStatus.ACTIVE) {
      return <Badge color="blue">Активный</Badge>;
    }

    return <Badge color="green">Завершен</Badge>;
  }, [tournament.status]);

  const getSeasonFinalChip = useCallback(() => {
    if (!tournament.seasonFinal) {
      return null;
    }

    return <Badge color="gold">Финал сезона</Badge>;
  }, [tournament.seasonFinal]);

  return (
    <Flex gap={'2'}>
      {getStatusChip()}
      {getSeasonFinalChip()}
    </Flex>
  );
}

export default TournamentInfoChips;
