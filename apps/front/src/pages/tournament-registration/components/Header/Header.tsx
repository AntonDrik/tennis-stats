import { Chip, Stack, Typography } from '@mui/material';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React from 'react';

interface IProps {
  tournament: ITournament;
  registeredUsersCount: number;
}

function TournamentRegistrationHeader({
  tournament,
  registeredUsersCount,
}: IProps) {
  const getChipLabel = () => {
    const parsedDate = parseISOWithFormat(tournament.date, 'dd.MM.yyyy');
    const usersStat = `${registeredUsersCount}/${tournament.playersCount}`;

    return `Дата проведения: ${parsedDate} | Участники: ${usersStat}`;
  };

  return (
    <Stack alignItems={'center'} mb={2}>
      <Typography variant={'h3'} mb={1}>
        Регистрация на турнир
      </Typography>

      <Chip label={getChipLabel()} />
    </Stack>
  );
}

export default TournamentRegistrationHeader;
