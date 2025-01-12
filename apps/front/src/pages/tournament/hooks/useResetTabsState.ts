import { ITournament } from '@tennis-stats/types';
import { useAtom, useSetAtom } from 'jotai/index';
import { useEffect, useRef } from 'react';
import { leaderboardTabAtom } from '../modals/LeaderboardModal/LeaderboardModal.state';
import { tournamentActiveTabAtom } from '../states/active-tab.state';

function useResetTabsState(tournament: ITournament | undefined) {
  const selectLeaderboardTab = useSetAtom(leaderboardTabAtom);
  const [activeTab, selectTab] = useAtom(tournamentActiveTabAtom);

  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (!tournament || !isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;

    const hasPlayoff = tournament.tours.some((tour) => tour.playOffStage);

    selectTab(hasPlayoff ? '-1' : '0');
  }, [tournament]);

  useEffect(() => {
    const isSelectedPlayoff = Number(activeTab) === -1;

    selectLeaderboardTab(isSelectedPlayoff ? 'playoff' : 'tours');
  }, [activeTab]);
}

export default useResetTabsState;
