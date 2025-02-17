import { ITournament } from '@tennis-stats/types';
import { isEmptyObject } from '@tennis-stats/helpers';
import { useAtom, useSetAtom } from 'jotai/index';
import queryString from 'query-string';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { highlightMatchAtom } from '../../../core/store';
import { leaderboardTabAtom } from '../states/leaderboard-modal.state';
import { tournamentActiveTabAtom } from '../states/active-tab.state';

function useInitTabsState(tournament: ITournament | undefined) {
  const { search } = useLocation();
  const queryParams = queryString.parse(search);

  const selectLeaderboardTab = useSetAtom(leaderboardTabAtom);
  const setMatchIdForHighlight = useSetAtom(highlightMatchAtom);
  const [activeTab, selectTab] = useAtom(tournamentActiveTabAtom);

  const isFirstRender = useRef<boolean>(true);

  const initTabsUsingTournament = (t: ITournament) => {
    const hasPlayoff = t.tours.some((tour) => tour.playOffStage);

    selectTab(hasPlayoff ? '-1' : '0');
  };

  const initTabsUsingQueryParams = (t: ITournament) => {
    const tours = t.tours;
    const matchIdForHighlight = Number(queryParams.matchId);

    setMatchIdForHighlight(matchIdForHighlight);

    for (let i = 0; i < tours.length; i++) {
      const match = tours[i].matches.findIndex((match) => match.id === matchIdForHighlight);

      if (match !== -1) {
        selectTab(String((tours[i].number ?? 0) - 1));

        break;
      }
    }
  };

  useEffect(() => {
    if (!tournament || !isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;

    if (isEmptyObject(queryParams)) {
      initTabsUsingTournament(tournament);
    } else {
      initTabsUsingQueryParams(tournament);
    }
  }, [tournament]);

  useEffect(() => {
    const isSelectedPlayoff = Number(activeTab) === -1;

    selectLeaderboardTab(isSelectedPlayoff ? 'playoff' : 'tours');
  }, [activeTab]);
}

export default useInitTabsState;
