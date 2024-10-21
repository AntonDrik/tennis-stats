import { Button, Flex, Heading } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React, { memo } from 'react';
import { useModal } from '../../../../shared/components';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import LeaderboardModal from '../../modals/LeaderboardModal/LeaderboardModal';
import TournamentSettingsMenu from './components/SettingsMenu/SettingsMenu';

interface IProps {
  tournament: ITournament;
  canManageTournament: boolean;
}

function TournamentHeader(props: IProps) {
  const modal = useModal();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const openLeaderboard = () => {
    modal.open(<LeaderboardModal tournamentId={props.tournament.id} />);
  };

  return (
    <Flex mb={'3'} justify={'between'} align={'center'} gap={'3'} wrap={'wrap'}>
      <Flex
        align={'center'}
        justify={!isMobileDevice ? 'start' : 'between'}
        gap={'2'}
        width={isMobileDevice ? '100%' : 'auto'}
      >
        <Heading size={'6'}>
          Турнир от {parseISOWithFormat(props.tournament.date, 'dd.MM.yyyy')}
        </Heading>

        {props.canManageTournament && (
          <TournamentSettingsMenu tournament={props.tournament} />
        )}
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

export default memo(TournamentHeader);
