import { Flex, Separator, Text } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes/routes.constant';
import { useUserPermissions } from '../../../../shared/hooks';
import TournamentDropdownMenu from './components/DropdownMenu/DropdownMenu';
import MiniLeaderboard from './components/MiniLeaderboard/MiniLeaderboard';
import TournamentStatusChip from './components/StatusChip/StatusChip';

import Styled from './TournamentCard.styles';

interface IProps {
  tournament: ITournament;
}

function TournamentCard(props: IProps) {
  const permissions = useUserPermissions();
  const navigate = useNavigate();

  const showMenu =
    props.tournament.status === ETournamentStatus.REGISTRATION &&
    permissions.canCrudTournament;

  const navigateToTournament = useCallback(() => {
    navigate(appRoutes.TOURNAMENT_BY_ID(props.tournament.id));
  }, [props.tournament.id]);

  return (
    <Styled.Card onClick={() => navigateToTournament()}>
      <Flex align={'center'} justify={'between'}>
        <Flex align={'center'} gap={'2'}>
          <Text size="3" weight="bold">
            {parseISOWithFormat(props.tournament.date, 'dd.MM.yyyy')}
          </Text>

          <TournamentStatusChip tournament={props.tournament} />
        </Flex>

        {showMenu && <TournamentDropdownMenu tournament={props.tournament} />}
      </Flex>

      <Separator my="2" size="4" />

      <MiniLeaderboard tournament={props.tournament} />
    </Styled.Card>
  );
}

export default memo(TournamentCard);
