import { Box, Tabs } from '@radix-ui/themes';
import { ETournamentStatus } from '@tennis-stats/types';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../../core/api';
import { updateTournamentAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import TournamentHeader from './components/Header/Header';
import PlayoffTab from './components/PlayoffTab/PlayoffTab';
import TournamentTabs from './components/Tabs/Tabs';
import TourTab from './components/TourTab/TourTab';
import { tabsAtom } from './states/Tabs.state';

type IRouteParams = {
  id: string;
};

function TournamentPage() {
  const params = useParams<IRouteParams>();

  const tournament = useGetTournamentQuery(params?.id, { cacheTime: 0 });

  const [tabsState, setTabsState] = useAtom(tabsAtom);
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  useBackButton({
    title: 'К списку Турниров',
    link: appRoutes.TOURNAMENTS,
  });

  useEffect(() => {
    if (!tournament.data) {
      return;
    }

    const hasTours = tournament.data.tours.length;

    updateTournamentState({
      selectedTournament: tournament.data,
      ...(!hasTours
        ? {
            selectedTour: null,
            selectedMatch: null,
            selectedGameSet: null,
          }
        : {}),
    });
  }, [tournament.data]);

  if (tournament.isLoading) {
    return <Spinner />;
  }

  if (!tournament.data) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  if (tournament.data.status === ETournamentStatus.REGISTRATION) {
    return <Navigate to={appRoutes.TOURNAMENT_REGISTRATION} />;
  }

  return (
    <Page title={`Турнир № ${tournament.data.id}`}>
      <TournamentHeader tournament={tournament.data} />

      <Tabs.Root value={tabsState} onValueChange={(value) => setTabsState(value)}>
        <TournamentTabs tours={tournament.data.tours} />

        <Box pt={'3'}>
          {tournament.data.tours.map((tour, index) => (
            <Tabs.Content key={`tour-${tour.id}`} value={`${index}`}>
              <TourTab tour={tour} />
            </Tabs.Content>
          ))}

          <Tabs.Content value={'-1'}>
            <PlayoffTab tournament={tournament.data} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Page>
  );
}

export default TournamentPage;
