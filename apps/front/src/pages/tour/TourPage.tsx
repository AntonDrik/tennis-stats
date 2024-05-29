import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ms from 'ms';
import { useParams } from 'react-router-dom';
import { useGetTourQuery } from '../../core/api';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { GameSetsList, MatchCard, MatchCardHeader, Page, Spinner, TourInfoPanel } from '../../shared/components';
import { EGameSetStatus } from '@tennis-stats/types';
import ReadyGameSetMenu from './components/ReadyGameSetMenu/ReadyGameSetMenu';
import FinishedGameSetMenu from './components/FinishedGameSetMenu/FinishedGameSetMenu';


type IRouteParams = {
  id: string
}

const FULL_MENU_STATUS = [EGameSetStatus.READY_TO_START, EGameSetStatus.IN_PROCESS];

function TourPage() {

  const params = useParams<IRouteParams>();

  const { data: tour, isLoading } = useGetTourQuery(params?.id ?? 0, {
    refetchInterval: ms('5s')
  });

  useBackButton({
    title: 'К списку туров',
    link: appRoutes.TOURS_LIST
  });

  return (
    <Page title={tour ? `${tour.id} Тур` : 'Тур'}>
      {isLoading && <Spinner page />}

      {tour && <TourInfoPanel tour={tour} />}

      <Box height={'100%'} overflow={'auto'}>
        <Stack spacing={3}>
          {
            (tour?.matches ?? []).map((match) => (
              <MatchCard key={match.id}>
                <MatchCardHeader match={match} />

                <GameSetsList
                  gameSetList={match.gameSets}
                  renderMenuCell={(gameSet) => {
                    if (gameSet.status === EGameSetStatus.FINISHED) {
                      return (
                        <FinishedGameSetMenu
                          match={match}
                          gameSet={gameSet}
                        />
                      );
                    }

                    if (FULL_MENU_STATUS.includes(gameSet.status)) {
                      return (
                        <ReadyGameSetMenu
                          match={match}
                          gameSet={gameSet}
                        />
                      );
                    }

                    return null;
                  }}
                />
              </MatchCard>
            ))
          }
        </Stack>
      </Box>

    </Page>
  );

}


export default TourPage;
