import { Flex, Heading, IconButton } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';
import { useNavigate } from 'react-router-dom';
import { useGetTournamentsListQuery } from '../../core/api';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import { useUserPermissions } from '../../shared/hooks';
import { PlusIcon } from '../../shared/svg-icons';
import TournamentCard from './components/TournamentCard/TournamentCard';
import useUpsertTournamentModal from './hooks/useUpsertTournamentModal';

import Styled from './TournamentsPage.styles';

function TournamentsPage() {
  const navigate = useNavigate();
  const permissions = useUserPermissions();
  const tournamentModal = useUpsertTournamentModal();

  const { data: tournamentsList, isLoading } = useGetTournamentsListQuery({
    sortByDate: true,
  });

  const navigateToTournament = (tournament: ITournament) => {
    navigate(appRoutes.TOURNAMENT_BY_ID(tournament.id));
  };

  return (
    <Page title={'Все турниры'}>
      {isLoading && <Spinner />}

      <Flex align={'center'} mb={'2'} gap={'2'}>
        <Heading align={'center'} size={'7'} mb={'2'}>
          Список всех турниров
        </Heading>

        {permissions.canCrudTournament && (
          <IconButton
            variant={'soft'}
            color={'green'}
            onClick={() => tournamentModal.open()}
          >
            <PlusIcon />
          </IconButton>
        )}
      </Flex>

      <Styled.Grid>
        {tournamentsList?.map((tournament) => (
          <TournamentCard
            key={`tournament-${tournament.id}`}
            tournament={tournament}
            onClick={() => navigateToTournament(tournament)}
          />
        ))}
      </Styled.Grid>
    </Page>
  );
}

export default TournamentsPage;
