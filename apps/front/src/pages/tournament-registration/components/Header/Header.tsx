import { Badge, Box, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React, { useMemo } from 'react';
import RatingStarIcon from '../../../../shared/svg-icons/rating-star.svg';

interface IProps {
  tournament: ITournament;
}

function TournamentRegistrationHeader({ tournament }: IProps) {
  const joinedUsersCount = tournament.registeredUsers.length;

  const tournamentInfo = useMemo(() => {
    const parsedDate = parseISOWithFormat(tournament.date, 'dd.MM.yyyy');
    const usersStat = `${joinedUsersCount}/${tournament.playersCount}`;

    return `Дата: ${parsedDate} | Участники: ${usersStat}`;
  }, [tournament.date, tournament.playersCount, joinedUsersCount]);

  // Рейтинг турнира
  const averageRating = useMemo(() => {
    const sumRating = tournament.registeredUsers.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);

    return Math.round(sumRating / joinedUsersCount);
  }, [tournament.registeredUsers, joinedUsersCount]);

  const isFull = useMemo(() => {
    return joinedUsersCount === tournament.playersCount;
  }, [joinedUsersCount, tournament.playersCount]);

  return (
    <Flex direction={'column'} align={'center'} gap={'2'} mb={'3'}>
      <Heading>Регистрация на турнир</Heading>

      <Badge size={'3'} variant={'surface'} color={!isFull ? 'indigo' : 'green'}>
        {tournamentInfo}
      </Badge>

      {joinedUsersCount > 0 && (
        <Badge size={'3'} variant={'surface'} color={'grass'}>
          <Flex>
            <Box width={'20px'} height={'20px'} mr={'2'}>
              <RatingStarIcon />
            </Box>

            <Text>
              Рейтинг турнира <Strong>{averageRating}</Strong>
            </Text>
          </Flex>
        </Badge>
      )}
    </Flex>
  );
}

export default TournamentRegistrationHeader;
