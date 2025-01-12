import { ITournament } from '@tennis-stats/types';
import { useSetAtom } from 'jotai/index';
import React, { useEffect } from 'react';
import TournamentActionsMenu from '../../components/ActionsMenu/ActionsMenu';
import TournamentHeader from '../../components/Header/Header';
import PlayoffTab from '../../components/PlayoffTab/PlayoffTab';
import { leaderboardTabAtom } from '../../modals/LeaderboardModal/LeaderboardModal.state';

interface IProps {
  tournament: ITournament;
}

function PlayoffTournament(props: IProps) {
  const tournament = props.tournament;

  const selectLeaderboardTab = useSetAtom(leaderboardTabAtom);

  useEffect(() => {
    selectLeaderboardTab('playoff');
  }, []);

  return (
    <>
      <TournamentHeader
        tournament={tournament}
        actions={<TournamentActionsMenu tournament={tournament} showFinishTournament />}
      />

      <PlayoffTab tournament={tournament} />
    </>
  );
}

export default PlayoffTournament;
