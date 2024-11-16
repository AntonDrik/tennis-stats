import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { TournamentNotMatchStatusException } from '../../../common/exceptions';

function checkStatus(tournament: Tournament, status: ETournamentStatus[]) {
  if (!status.includes(tournament.status)) {
    throw new TournamentNotMatchStatusException(tournament.status);
  }
}

export default checkStatus;
