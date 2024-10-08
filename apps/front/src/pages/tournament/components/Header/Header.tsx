import { Button, Flex, Heading } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React from 'react';
import { useModal } from '../../../../shared/components';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { useCanManageTournament } from '../../hooks';
import LeaderboardModal from '../../modals/LeaderboardModal/LeaderboardModal';
import TournamentAdminMenu from './components/AdminMenu/AdminMenu';

interface IProps {
  tournament: ITournament;
}

function TournamentHeader({ tournament }: IProps) {
  const modal = useModal();
  const canManageTournament = useCanManageTournament(tournament);
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const openLeaderboard = () => {
    modal.open(<LeaderboardModal tournamentId={tournament.id} />);
  };

  return (
    <Flex mb={'3'} justify={'between'} align={'center'} gap={'3'} wrap={'wrap'}>
      <Flex align={'center'} gap={'2'}>
        <Heading size={'6'}>
          Турнир от {parseISOWithFormat(tournament.date, 'dd.MM.yyyy')}
        </Heading>

        {canManageTournament && <TournamentAdminMenu tournament={tournament} />}
      </Flex>

      <Button
        size={'3'}
        variant={'soft'}
        color={'bronze'}
        style={{ width: isMobileDevice ? '100%' : 'auto' }}
        onClick={openLeaderboard}
      >
        Таблица лидеров
      </Button>
    </Flex>
  );
}

export default TournamentHeader;
