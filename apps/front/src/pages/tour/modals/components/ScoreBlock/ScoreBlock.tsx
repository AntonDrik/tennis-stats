import Stack from '@mui/material/Stack';
import { TScore } from '@tennis-stats/types';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetGameSetQuery } from '../../../../../core/api';
import { VerticalNumberInput } from '../../../../../shared/components';
import { tourPageStateAtom } from '../../../TourPage.state';
import { scoreAtom } from './state/Score.state';
import { incrementServeAtom, serveAtom } from './state/Serve.state';
import PlayerLabel from './components/PlayerLabel/PlayerLabel';
import MiddleControls from './components/MiddleControls/MiddleControls';
import Styled from './ScoreBlock.styles';


interface IProps {
  interactive?: boolean;
  refetchIntervalMs?: number;
  onChange?: (score: [TScore, TScore]) => void;
}

function ScoreBlock(props: IProps) {

  const serve = useAtomValue(serveAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const tourPageState = useAtomValue(tourPageStateAtom);
  const incrementServe = useSetAtom(incrementServeAtom);

  const [isReverted, setIsReverted] = useState(false);
  const [value1, setValue1] = useState<TScore>(0);
  const [value2, setValue2] = useState<TScore>(0);

  const isPlayer1Server = Boolean(props.interactive && serve.player === 1);
  const isPlayer2Server = Boolean(props.interactive && serve.player === 2);

  const { data: gameSet } = useGetGameSetQuery(
    tourPageState,
    props.refetchIntervalMs
  );

  const handleChangeInput = (type: 'player1' | 'player2', value: number | undefined) => {
    if (!Number.isFinite(value)) {
      return;
    }

    const newScore = type === 'player1'
      ? [value as TScore, score[1]]
      : [score[0], value as TScore];

    setScore(newScore as [TScore, TScore]);
    props.onChange?.(newScore as [TScore, TScore]);

    if (props.interactive) {
      incrementServe();
    }
  };

  useEffect(() => {
    if (!gameSet) {
      return;
    }

    setScore([gameSet.player1.score, gameSet.player2.score]);
  }, [gameSet]);

  useEffect(() => {
    setValue1(score[0]);
    setValue2(score[1]);
  }, [score]);

  return (
    <Stack direction={isReverted ? 'row-reverse' : 'row'} justifyContent={'space-evenly'}>

      <Styled.SectionWrapper gap={3} $selected={isPlayer1Server}>
        <PlayerLabel player={gameSet?.player1} number={1} />

        <VerticalNumberInput
          value={value1}
          min={0}
          max={20}
          inputMode={'none'}
          onChange={(e, value) => {
            if (e.type === 'blur') {
              return;
            }

            handleChangeInput('player1', value);
          }}
        />
      </Styled.SectionWrapper>

      <MiddleControls
        interactive={props.interactive}
        onRevertClick={() => setIsReverted(!isReverted)}
      />

      <Styled.SectionWrapper gap={3} $selected={isPlayer2Server}>
        <PlayerLabel player={gameSet?.player2} number={2} />

        <VerticalNumberInput
          value={value2}
          min={0}
          max={20}
          inputMode={'numeric'}
          onChange={(e, value) => {
            if (e.type === 'blur') {
              return;
            }

            handleChangeInput('player2', value);
          }}
        />
      </Styled.SectionWrapper>

    </Stack>
  );

}

export default ScoreBlock;
