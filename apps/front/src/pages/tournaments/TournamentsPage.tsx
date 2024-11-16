import { Flex, Heading, IconButton } from '@radix-ui/themes';
import { useGetTournamentsListQuery } from '../../core/api';
import { Page, Spinner } from '../../shared/components';
import { useUserPermissions } from '../../shared/hooks';
import useMediaQuery from '../../shared/hooks/useMediaQuery';
import { PlusIcon } from '../../shared/svg-icons';
import TournamentCard from './components/TournamentCard/TournamentCard';
import useUpsertTournamentModal from './hooks/useUpsertTournamentModal';

import Styled from './TournamentsPage.styles';

function TournamentsPage() {
  const permissions = useUserPermissions();
  const tournamentModal = useUpsertTournamentModal();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const { data: tournamentsList, isLoading } = useGetTournamentsListQuery({
    sortByDate: true,
    withLeaderboard: true,
  });

  return (
    <Page title={'Все турниры'}>
      {isLoading && <Spinner />}

      <Flex
        align={'center'}
        mb={'2'}
        gap={'2'}
        width={isMobileDevice ? '100%' : 'auto'}
        justify={isMobileDevice ? 'between' : 'start'}
      >
        <Heading align={'center'} size={'7'} mb={'2'}>
          Список турниров
        </Heading>

        {permissions.canCrudTournament && (
          <IconButton color={'green'} onClick={() => tournamentModal.open()}>
            <PlusIcon />
          </IconButton>
        )}
      </Flex>

      <Styled.Grid>
        {tournamentsList?.map((tournament) => (
          <TournamentCard key={`tournament-${tournament.id}`} tournament={tournament} />
        ))}
      </Styled.Grid>
    </Page>
  );
}

export default TournamentsPage;
