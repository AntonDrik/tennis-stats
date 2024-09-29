import { TPlayOffStage } from '@tennis-stats/types';

const allRounds: TPlayOffStage[] = [
  '1/64',
  '1/32',
  '1/16',
  '1/8',
  '1/4',
  '1/2',
  '1/1',
];

function getRoundsListByUsersLength(usersCount: number): TPlayOffStage[] {
  let rounds = 0;

  while (usersCount > 1) {
    rounds += 1;

    if (usersCount % 2 === 0) {
      usersCount = usersCount / 2;
    } else {
      usersCount = Math.ceil(usersCount / 2);
    }
  }

  return allRounds.slice(-rounds);
}

export { getRoundsListByUsersLength };
