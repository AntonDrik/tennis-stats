import { ITournament } from '@tennis-stats/types';
import { useAtom, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';
import { updateTournamentStateAtom } from '../../../core/store';
import { leaderboardTabAtom } from '../modals/LeaderboardModal/LeaderboardModal.state';
import { tournamentActiveTabAtom } from '../states/active-tab.state';

function useInitializeState(tournament: ITournament | undefined) {
  const updateTournamentState = useSetAtom(updateTournamentStateAtom);
  const [activeTab, setActiveTab] = useAtom(tournamentActiveTabAtom);
  const setLeaderboardTab = useSetAtom(leaderboardTabAtom)

  const resetTabsState = () => {
    if (!tournament) {
      return;
    }

    const toursLength = tournament.tours.filter((tour) => !tour.playOffStage).length;
    const hasPlayoff = tournament.tours.some((tour) => tour.playOffStage);

    if (Number(activeTab) >= toursLength) {
      setActiveTab('0');
    }

    if (!hasPlayoff) {
      setActiveTab('0');
      setLeaderboardTab('tours')
    }
  };

  useEffect(() => {
    if (!tournament) {
      return;
    }

    resetTabsState();

    const hasTours = tournament.tours.length;

    if (!hasTours) {
      updateTournamentState({
        selectedTournament: tournament,
        selectedTour: null,
        selectedMatch: null,
        selectedGameSet: null
      });
    } else {
      updateTournamentState({
        selectedTournament: tournament
      });
    }
  }, [tournament]);

}


export default useInitializeState;
