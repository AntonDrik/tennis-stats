import { Match } from '@tennis-stats/entities';
import { getPlayoffStageInfo } from '@tennis-stats/helpers';
import { TPlayOffStage } from '@tennis-stats/types';

function getNextPlayoffStageMatchId(match: Match) {
  const currStage = match.tour.playOffStage as TPlayOffStage;

  const currStageMatchesCount = getPlayoffStageInfo(currStage).matchesCount;

  const multiplier = match.number / 2;
  const increaseValue = Math.ceil(currStageMatchesCount - match.number + multiplier);

  return match.id + increaseValue;
}

export default getNextPlayoffStageMatchId;
