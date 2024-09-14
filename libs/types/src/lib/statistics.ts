import { TScoreCaption } from './player';


interface IPairStatistic {
  user1: {
    id: number
    shortName: string
    score: number
  },
  user2: {
    id: number
    shortName: string
    score: number
  }
  gamesCount: number
  additionsCount: number
}


interface ICommonStatistic {
  gamesCount: number;
  additionsCount: number;
  mostPopularScore: TScoreCaption;
  avgScoreDifference: number;
  inGameTime: string
}

interface IAvailableDates {
  date: string;
}

export {
  IPairStatistic,
  ICommonStatistic,
  IAvailableDates
};
