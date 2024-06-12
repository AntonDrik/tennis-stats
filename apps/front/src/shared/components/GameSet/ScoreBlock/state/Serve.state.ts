import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { isDopsScoreAtom } from './Score.state';

type TServe = {
  player: null | 1 | 2;
  count: number,
  animate: boolean
}

const serveAtom = atomWithStorage<TServe>('serve', { player: null, count: 2, animate: false });

const incrementServeAtom = atom(
  null,
  (get, set) => {
    const currentServe = get(serveAtom);
    const isDops = get(isDopsScoreAtom);

    if (currentServe.player === null) {
      return;
    }

    if (currentServe.count - 1 === 0) {
      set(serveAtom, {
        player: currentServe.player === 1 ? 2 : 1,
        count: isDops ? 1 : 2,
        animate: false
      });

      return;
    }

    set(serveAtom, {
      ...currentServe,
      count: currentServe.count - 1
    });
  }
);

const changeServeAtom = atom(
  null,
  (get, set, playerNumber: 1 | 2 | null) => {
    const isDops = get(isDopsScoreAtom);
    const currentServe = get(serveAtom);

    if (currentServe.player === null) {
      return;
    }

    const isSamePlayer = currentServe.player === playerNumber;

    const getCount = () => {
      if (isSamePlayer) {
        const newScore = currentServe.count - 1;

        return isDops ? 1 : newScore < 1 ? 2 : newScore;
      }

      return isDops ? 1 : 2;
    };

    set(serveAtom, {
      player: playerNumber,
      count: getCount(),
      animate: false
    });
  }
);

const randomizeServeAtom = atom(
  null,
  async (get, set) => {
    const currentServe = get(serveAtom);

    if (currentServe.player !== null) {
      return;
    }

    set(serveAtom, {
      ...currentServe,
      animate: true
    });

    await new Promise((res) => setTimeout(res, 3000));

    set(serveAtom, {
      player: Math.floor(Math.random() * (2 - 1 + 1) + 1) as 1 | 2 | null,
      count: 2,
      animate: false
    });
  }
);

const resetServeAtom = atom(
  null,
  (get, set) => {
    set(serveAtom, {
      player: null,
      count: 2,
      animate: false
    });
  }
);


export {
  serveAtom,
  incrementServeAtom,
  randomizeServeAtom,
  changeServeAtom,
  resetServeAtom
};
