import Stack from '@mui/material/Stack';
import { TScore } from '@tennis-stats/types';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetGameSetQuery } from '../../../../core/api';
import { ITourPageState } from '../../../../core/store';
import { VerticalNumberInput } from '../../index';
import MiddleControls from './components/MiddleControls/MiddleControls';
import PlayerLabel from './components/PlayerLabel/PlayerLabel';
import Styled from './ScoreBlock.styles';
import { scoreAtom } from './state/Score.state';
import { incrementServeAtom, serveAtom } from './state/Serve.state';


interface IProps {
  tourPageState: ITourPageState;
  interactive?: boolean;
  refetchIntervalMs?: number;
  onChange?: (score: [TScore, TScore]) => void;
}

function ScoreBlock(props: IProps) {

  const serve = useAtomValue(serveAtom);
  const [score, setScore] = useAtom(scoreAtom);
  const incrementServe = useSetAtom(incrementServeAtom);

  const [isReverted, setIsReverted] = useState(false);
  const [value1, setValue1] = useState<TScore>(0);
  const [value2, setValue2] = useState<TScore>(0);

  const isPlayer1Serve = Boolean(props.interactive && serve.player === 1);
  const isPlayer2Serve = Boolean(props.interactive && serve.player === 2);

  const { data: gameSet } = useGetGameSetQuery(
    props.tourPageState,
    props.refetchIntervalMs
  );

  const handleChangeInput = (type: 'player1' | 'player2', value: number) => {
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

      <Styled.SectionWrapper gap={2} $selected={isPlayer1Serve}>
        <PlayerLabel player={gameSet?.player1} number={1} />

        <VerticalNumberInput
          value={value1}
          min={0}
          max={20}
          onChange={(value) => {
            handleChangeInput('player1', value as number);
          }}
        />
      </Styled.SectionWrapper>

      <MiddleControls
        interactive={props.interactive}
        onRevertClick={() => setIsReverted(!isReverted)}
      />

      <Styled.SectionWrapper gap={2} $selected={isPlayer2Serve}>
        <PlayerLabel player={gameSet?.player2} number={2} />

        <VerticalNumberInput
          value={value2}
          min={0}
          max={20}
          onChange={(value) => {
            handleChangeInput('player2', value as number);
          }}
        />
      </Styled.SectionWrapper>

    </Stack>
  );

}

export default ScoreBlock;
