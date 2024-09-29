import { createArray, uniqueCombinations } from '@tennis-stats/helpers';

export default function getAllScoresForMatch(setsCount: number): number[][] {
  const gameSetsCount = Number(setsCount);
  const tempArr = createArray(gameSetsCount + 1);

  return uniqueCombinations(tempArr).reduce((acc, curr) => {
    if (curr[0] + curr[1] === gameSetsCount) {
      acc.push(curr);
    }

    return acc;
  }, [] as number[][]);
}
