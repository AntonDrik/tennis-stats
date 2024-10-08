import { Badge, Flex, Heading } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React, { useMemo } from 'react';

interface IProps {
  tournament: ITournament;
  registeredUsersCount: number;
}

function TournamentRegistrationHeader({ tournament, registeredUsersCount }: IProps) {
  const badgeLabel = useMemo(() => {
    const parsedDate = parseISOWithFormat(tournament.date, 'dd.MM.yyyy');
    const usersStat = `${registeredUsersCount}/${tournament.playersCount}`;

    return `Дата проведения: ${parsedDate} | Участники: ${usersStat}`;
  }, [tournament.date, tournament.playersCount, registeredUsersCount]);

  const isFull = useMemo(() => {
    return registeredUsersCount === tournament.playersCount;
  }, [registeredUsersCount, tournament.playersCount]);

  return (
    <Flex direction={'column'} align={'center'} gap={'2'}>
      <Heading>Регистрация на турнир</Heading>

      <Badge size={'3'} variant={'surface'} color={!isFull ? 'indigo' : 'green'}>
        {badgeLabel}
      </Badge>
    </Flex>
  );
}

export default TournamentRegistrationHeader;
