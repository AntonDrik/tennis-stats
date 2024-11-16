import { Badge, Flex, Heading } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React, { useMemo } from 'react';

interface IProps {
  tournament: ITournament;
}

function TournamentRegistrationHeader({ tournament }: IProps) {
  const joinedUsersCount = tournament.registeredUsers.length;

  const badgeLabel = useMemo(() => {
    const parsedDate = parseISOWithFormat(tournament.date, 'dd.MM.yyyy');
    const usersStat = `${joinedUsersCount}/${tournament.playersCount}`;

    return `Дата: ${parsedDate} | Участники: ${usersStat}`;
  }, [tournament.date, tournament.playersCount, joinedUsersCount]);

  const isFull = useMemo(() => {
    return joinedUsersCount === tournament.playersCount;
  }, [joinedUsersCount, tournament.playersCount]);

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
