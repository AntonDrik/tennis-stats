import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGetLeaderboardQuery } from '../../../../core/api';
import { Leaderboard } from '../../../../shared/components/Tournament';

interface IProps {
  tournamentId: number;
}

function LeaderboardModal(props: IProps) {
  const leaderboard = useGetLeaderboardQuery(props.tournamentId);

  return (
    <React.Fragment>
      <DialogTitle align={'center'}>Таблица лидеров</DialogTitle>

      <DialogContent>
        {leaderboard.data && (
          <Leaderboard leaderboardItems={leaderboard.data} />
        )}
      </DialogContent>
    </React.Fragment>
  );
}

export default LeaderboardModal;
