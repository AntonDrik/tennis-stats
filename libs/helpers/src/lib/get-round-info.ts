import { TPlayOffRound } from '@tennis-stats/types';

const allRounds: TPlayOffRound[] = ['1/64', '1/32', '1/16', '1/8', '1/4', '1/2', '1/1'];

function getRoundInfo(round: TPlayOffRound) {
  const secondValue = round.split('/')[1];

  const usersCount = Number(secondValue) * 2;
  const matchesCount = Number(secondValue);

  const index = allRounds.findIndex((r) => r === round);

  const nextRounds = index === -1 ? [] : allRounds.slice(index + 1);

  return {
    usersCount,
    matchesCount,
    nextRounds,
  };
}

export default getRoundInfo;
