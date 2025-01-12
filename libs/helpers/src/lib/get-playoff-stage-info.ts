import { TPlayOffStage } from '@tennis-stats/types';

const allStages: TPlayOffStage[] = ['1/64', '1/32', '1/16', '1/8', '1/4', '1/2', '1/1'];

function getPlayoffStageInfo(stage: TPlayOffStage | undefined) {
  const secondValue = stage?.split('/')?.[1];

  const usersCount = Number(secondValue) * 2;
  const matchesCount = Number(secondValue);

  const index = allStages.findIndex((r) => r === stage);

  const nextRounds = index === -1 ? [] : allStages.slice(index + 1);

  return {
    usersCount,
    matchesCount,
    nextRounds,
  };
}

export default getPlayoffStageInfo;
