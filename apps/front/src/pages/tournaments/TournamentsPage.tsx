import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useNavigate } from 'react-router-dom';
import { useGetTournamentsListQuery } from '../../core/api';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import { useUserPermissions } from '../../shared/hooks';
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
    if (tournament.status === ETournamentStatus.REGISTRATION) {
      navigate(appRoutes.TOURNAMENT_REGISTRATION);

      return;
    }
    navigate(appRoutes.TOURNAMENT_BY_ID(tournament.id));
  };

  return (
    <Page title={'Все турниры'}>
      {isLoading && <Spinner />}

      <Box display={'flex'} justifyContent={'center'} mb={2}>
        <Typography variant={'h2'} fontWeight={600}>
          Список всех турниров
        </Typography>
      </Box>

      <Styled.Grid>
        {permissions.canCrudTournament && (
          <TournamentCard
            type={'add-new'}
            onClick={() => tournamentModal.open()}
          />
        )}

        {tournamentsList?.reverse().map((tournament) => (
          <TournamentCard
            key={`tournament-${tournament.id}`}
            type={'data'}
            tournament={tournament}
            onClick={() => navigateToTournament(tournament)}
          />
        ))}
      </Styled.Grid>
    </Page>
  );
}

export default TournamentsPage;
