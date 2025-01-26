import { Tournament } from '@tennis-stats/entities';
import { ISeasonLeaderboard } from '@tennis-stats/types';

export default function getSeasonLeaderboard(tournaments: Tournament[]): ISeasonLeaderboard[] {
  const lastTournament = tournaments[tournaments.length - 1];

  if (!lastTournament?.leaderboard?.length) {
    return [];
  }

  return lastTournament.leaderboard.map((leader) => ({
    place: leader.place,
    user: leader.user,
  }));
}
