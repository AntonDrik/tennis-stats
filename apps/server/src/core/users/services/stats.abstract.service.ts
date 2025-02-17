import { GameSet, Match, Tour, Tournament } from '@tennis-stats/entities';

export interface ITournamentExtractedData {
  tours: Tour[];
  matches: Match[];
  gameSets: GameSet[];
}

abstract class UserStatsService {
  public extractData(userTournaments: Tournament[]): ITournamentExtractedData {
    const initial: ITournamentExtractedData = { tours: [], matches: [], gameSets: [] };

    return userTournaments.reduce((acc, curr) => {
      const tours = curr.tours;
      const matches = tours.flatMap((tour) => tour.matches);
      // const gameSets = matches.flatMap((match) => match.gameSets);

      acc.tours.push(...tours);
      acc.matches.push(...matches);
      // acc.gameSets.push(...gameSets);

      return acc;
    }, initial);
  }

  public getWinPercent(match: Match[], winnerId: number): number | null {
    if (!match.length) {
      return null;
    }

    const winsCount = match.reduce((acc, curr) => {
      const data = curr.helpers.getWinnerLooser();
      if (!data) {
        return acc;
      }

      const { winner } = data;

      return acc + Number(winner.id === winnerId);
    }, 0);

    if (!winsCount) {
      return 0;
    }

    const percent = (winsCount / match.length) * 100;

    return Number(percent.toFixed(2));
  }
}

export default UserStatsService;
