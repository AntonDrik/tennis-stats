import { Match, Tournament } from '@tennis-stats/entities';
import { mapToArray } from '@tennis-stats/helpers';
import { ISeasonStats, ISeasonUserStat } from '@tennis-stats/types';

export default function getSeasonStats(tournaments: Tournament[]): ISeasonStats {
  const collection = new Map<number, ISeasonUserStat>();

  const allFinishedMatches = tournaments
    .flatMap((tournament) => tournament.tours)
    .flatMap((tour) => tour.matches)
    .filter((match) => match.isFinished);

  allFinishedMatches.map((match) => {
    setMatchStatsToCollection(match, 'user1', collection);
    setMatchStatsToCollection(match, 'user2', collection);
  });

  setTournamentStatsToCollection(tournaments, collection);

  return {
    tournamentsCount: tournaments.length,
    usersData: mapToArray(collection).sort(byVisitsAndWins),
  };
}

function setMatchStatsToCollection(
  match: Match,
  userKey: 'user1' | 'user2',
  collection: Map<number, ISeasonUserStat>
): void {
  const user = match[userKey];
  const stats = collection.get(user.id);

  if (!stats) {
    collection.set(user.id, {
      user,
      tournamentsCount: 0,
      matchesCount: 1,
      matchWinCount: Number(match.helpers.isWinner(user)),
    });

    return;
  }

  stats.matchesCount += 1;
  stats.matchWinCount += Number(match.helpers.isWinner(user));
}

function setTournamentStatsToCollection(
  tournaments: Tournament[],
  collection: Map<number, ISeasonUserStat>
): void {
  tournaments
    .flatMap((tournament) => tournament.registeredUsers)
    .forEach((user) => {
      const stats = collection.get(user.id);

      if (!stats) {
        return;
      }

      stats.tournamentsCount += 1;
    });
}

const byVisitsAndWins = (a: ISeasonUserStat, b: ISeasonUserStat) => {
  return b.tournamentsCount - a.tournamentsCount || b.matchWinCount - a.matchWinCount;
};
