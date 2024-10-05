import { Match } from '@tennis-stats/entities';
import { getRoundInfo } from '@tennis-stats/helpers';
import { TPlayOffRound } from '@tennis-stats/types';

function getNextPlayoffMatchId(match: Match, currRound: TPlayOffRound) {
  const currRoundMatchesCount = getRoundInfo(currRound).matchesCount;

  const multiplier = match.number / 2;
  const increaseValue = Math.ceil(currRoundMatchesCount - match.number + multiplier);

  return match.id + increaseValue;
}

export default getNextPlayoffMatchId;
