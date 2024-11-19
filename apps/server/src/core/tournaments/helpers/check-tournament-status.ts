import { HttpException } from '@nestjs/common';
import { Tournament } from '@tennis-stats/entities';
import { ETournamentStatus } from '@tennis-stats/types';
import { TournamentNotMatchStatusException } from '../../../common/exceptions';

function checkStatus(
  tournament: Tournament,
  status: ETournamentStatus[],
  exception?: HttpException
) {
  if (!status.includes(tournament.status)) {
    if (!exception) {
      throw new TournamentNotMatchStatusException(tournament.status);
    }

    throw exception;
  }
}

export default checkStatus;
