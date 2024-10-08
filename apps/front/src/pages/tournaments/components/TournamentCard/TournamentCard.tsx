import { Box, Flex, Separator, Text } from '@radix-ui/themes';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ETournamentStatus } from '@tennis-stats/types';
import { useUserPermissions } from '../../../../shared/hooks';
import PlusIcon from '../../../../shared/svg-icons/plus-icon';
import TournamentDropdownMenu from './components/DropdownMenu/DropdownMenu';
import TournamentStatusChip from './components/StatusChip/StatusChip';

import Styled from './TournamentCard.styles';
import { TProps } from './types/TournamentCard.types';

function TournamentCard(props: TProps) {
  const permissions = useUserPermissions();

  if (props.type === 'add-new') {
    return (
      <Styled.Card onClick={() => props.onClick?.()}>
        <Flex align={'center'} justify={'center'} height={'100%'}>
          <PlusIcon size={3} />
        </Flex>
      </Styled.Card>
    );
  }

  const showMenu =
    props.tournament.status === ETournamentStatus.REGISTRATION &&
    permissions.canCrudTournament;

  return (
    <Styled.Card onClick={() => props.onClick?.()}>
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

      <Box></Box>
    </Styled.Card>
  );
}

export default TournamentCard;
