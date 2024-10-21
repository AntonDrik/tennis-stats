import { IMatchScore } from '@tennis-stats/types';
import toFixedNumber from './to-fixed-number';

interface IRatingPayload {
  delta: number;
  visual: string;
}

function calculateRating(
  winnerRating: number,
  looserRating: number,
  matchScore: IMatchScore
): IRatingPayload {
  const tourMultiplier = getTournamentMultiplier();
  const scoreMultiplier = getScoreMultiplier(matchScore);

  const delta =
    ((100 - (winnerRating - looserRating)) / 10) * tourMultiplier * scoreMultiplier;

  const fixedDelta = toFixedNumber(delta);

  return {
    delta: fixedDelta,
    visual: `[(100 - (${winnerRating} - ${looserRating})) / 10] * ${tourMultiplier} * ${scoreMultiplier} = ${fixedDelta}`,
  };
}

function getScoreMultiplier(matchScore: IMatchScore): number {
  const scoreDiff = Math.abs(matchScore.user1 - matchScore.user2);

  if (scoreDiff === 1) {
    return 0.8;
  }

  if (scoreDiff === 2) {
    return 1;
  }

  if (scoreDiff > 2) {
    return 1.2;
  }

  return 1;
}

// Временно фиксированное значение
function getTournamentMultiplier(): number {
  return 0.2;

  // if (tournamentAvgRating < 250) {
  //   return 0.2;
  // }
  //
  // if (tournamentAvgRating >= 250 && tournamentAvgRating < 350) {
  //   return 0.25;
  // }
  //
  // if (tournamentAvgRating >= 350 && tournamentAvgRating < 450) {
  //   return 0.3;
  // }
  //
  // if (tournamentAvgRating >= 450 && tournamentAvgRating < 550) {
  //   return 0.35;
  // }
  //
  // if (tournamentAvgRating > 550) {
  //   return 0.4;
  // }
  //
  // return 1;
}

export default calculateRating;
