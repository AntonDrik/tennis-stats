import { ITournament } from '@tennis-stats/types';

type TMatch<T extends ITournament> = T['tours'][number]['matches'];

class TournamentHelpers<T extends ITournament> {
  private registeredUsers: T['registeredUsers'] = [];
  private tours: T['tours'] = [];
  private matches: TMatch<T> = [];

  constructor(private tournament: T) {
    this.registeredUsers = this.tournament.registeredUsers;
    this.tours = this.tournament.tours;
    this.matches = this.tournament.tours.flatMap((tour) => tour.matches);
  }

  public getSystemUser(): T['registeredUsers'][number] | undefined {
    return this.registeredUsers.find((user) => user.nickname === 'Халява');
  }

  public getUserMatches(userId: number | undefined): TMatch<T> {
    return this.matches.filter((match) => {
      return match.user1.id === userId || match.user2.id === userId;
    });
  }

  public getNextTourNumber(): number {
    const simpleTours = this.tours?.filter((tour) => tour?.number);
    const lastTour = simpleTours?.[simpleTours?.length - 1];

    return (lastTour?.number ?? 0) + 1;
  }
}

export default TournamentHelpers;
