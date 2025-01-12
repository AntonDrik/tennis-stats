import { ETournamentStatus, ETournamentType, ITournament } from '@tennis-stats/types';
import { useCallback } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../../core/api';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import PlayoffTournament from './containers/PlayoffTournament/PlayoffTournament';
import TournamentWithTours from './containers/TournamentWithTours/TournamentWithTours';
import useInitializeTournamentState from './hooks/useInitializeTournamentState';

type IRouteParams = {
  id: string;
};

function TournamentPage() {
  const params = useParams<IRouteParams>();

  const tournament = useGetTournamentQuery(params?.id, {
    staleTime: 100,
    refetchOnWindowFocus: true,
  });

  const tournamentTemplate = useCallback((_tournament: ITournament) => {
    const dict = {
      [ETournamentType.SWISS_SYSTEM]: <TournamentWithTours tournament={_tournament} />,
      [ETournamentType.ROUND_ROBIN]: <TournamentWithTours tournament={_tournament} />,
      [ETournamentType.PLAYOFF]: <PlayoffTournament tournament={_tournament} />,
    };

    return dict[_tournament.type];
  }, []);

  useInitializeTournamentState(tournament.data);

  if (tournament.isLoading) {
    return <Spinner />;
  }

  if (!tournament.data) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  if (tournament.data.status === ETournamentStatus.REGISTRATION) {
    return <Navigate to={appRoutes.TOURNAMENT_REGISTRATION(tournament.data.id)} />;
  }

  return (
    <Page title={`Турнир № ${tournament.data.id}`}>
      {tournamentTemplate(tournament.data)}
    </Page>
  );
}

export default TournamentPage;
