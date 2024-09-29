import { ETournamentStatus } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../../core/api';
import { updateTournamentAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import TabContent from '../../shared/components/TabContent/TabContent';
import TournamentControlPanel from './components/ControlPanel/ControlPanel';
import PlayoffTab from './components/PlayoffTab/PlayoffTab';
import TournamentTabs from './components/Tabs/Tabs';
import TourTab from './components/TourTab/TourTab';
import { tabsAtom } from './state/Tabs.state';

type IRouteParams = {
  id: string;
};

function TournamentPage() {
  const params = useParams<IRouteParams>();

  const { data, isLoading } = useGetTournamentQuery(params?.id);

  const tabsState = useAtomValue(tabsAtom);
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const isPlayoffStage = data?.status === ETournamentStatus.PLAYOFF;

  useBackButton({
    title: 'К списку Турниров',
    link: appRoutes.TOURNAMENTS,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const hasTours = data.tours.length;

    if (hasTours) {
      updateTournamentState({
        selectedTournament: data,
      });
    } else {
      updateTournamentState({
        selectedTournament: data,
        selectedTour: null,
        selectedMatch: null,
        selectedGameSet: null,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  if (data.status === ETournamentStatus.REGISTRATION) {
    return <Navigate to={appRoutes.TOURNAMENT_REGISTRATION} />;
  }

  return (
    <Page title={`Турнир № ${1}`}>
      <TournamentControlPanel tournament={data} />

      <TournamentTabs tours={data.tours} showPlayoffTab={isPlayoffStage} />

      {data.tours.map((tour, index) => (
        <TabContent
          key={`tour-${tour.id}`}
          index={index}
          value={tabsState}
          sxProps={{ px: 0, py: 2 }}
        >
          <TourTab tour={tour} />
        </TabContent>
      ))}

      <TabContent index={-1} value={tabsState} sxProps={{ px: 0, py: 2 }}>
        <PlayoffTab tournament={data} />
      </TabContent>
    </Page>
  );
}

export default TournamentPage;
