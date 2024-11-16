import { Button, Flex, Heading, IconButton } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ITournament } from '@tennis-stats/types';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes/routes.constant';
import { useModal } from '../../../../shared/components';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { ChevronLeftIcon } from '../../../../shared/svg-icons';
import LeaderboardModal from '../../modals/LeaderboardModal/LeaderboardModal';
import TournamentActionsMenu from './components/ActionsMenu/ActionsMenu';

interface IProps {
  tournament: ITournament;
  canManageTournament: boolean;
}

function TournamentHeader(props: IProps) {
  const modal = useModal();
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const openLeaderboard = () => {
    modal.open(<LeaderboardModal tournamentId={props.tournament.id} />);
  };

  const backToTournamentsList = () => {
    navigate(appRoutes.TOURNAMENTS);
  };

  return (
    <Flex mb={'3'} justify={'between'} align={'center'} gap={'3'} wrap={'wrap'}>
      <Flex align={'center'} justify={'between'} gap={'2'} style={{ flex: 1 }}>
        <Flex gap={'2'} align={'center'}>
          <IconButton
            variant={'outline'}
            color={'indigo'}
            size={'2'}
            onClick={backToTournamentsList}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Heading size={'6'}>
            Турнир {parseISOWithFormat(props.tournament.date, 'dd.MM.yyyy')}
          </Heading>
        </Flex>

        {props.canManageTournament && (
          <TournamentActionsMenu tournament={props.tournament} />
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
