import Stack from '@mui/material/Stack';
import { TScore } from '@tennis-stats/types';
import { useAtom } from 'jotai';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetGameSetQuery } from '../../../../core/api';
import { ITournamentState } from '../../../../core/store';
import { VerticalNumberInput } from '../../index';
import MiddleControls from './components/MiddleControls/MiddleControls';
import PlayerLabel from './components/PlayerLabel/PlayerLabel';
import Styled from './ScoreBlock.styles';
import { scoreAtom } from './state/Score.state';

interface IProps {
  tournamentState: ITournamentState;
  onChange?: (score: [TScore, TScore]) => void;
}

function ScoreBlock(props: IProps) {
  const [score, setScore] = useAtom(scoreAtom);

  const [value1, setValue1] = useState<TScore>(0);
  const [value2, setValue2] = useState<TScore>(0);

  const { data: gameSet } = useGetGameSetQuery(props.tournamentState);

  const handleChangeInput = (type: 'player1' | 'player2', value: number) => {
    if (!Number.isFinite(value)) {
      return;
    }

    const newScore =
      type === 'player1'
        ? [value as TScore, score[1]]
        : [score[0], value as TScore];

    setScore(newScore as [TScore, TScore]);
    props.onChange?.(newScore as [TScore, TScore]);
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
    <Stack direction={'row'} justifyContent={'space-evenly'}>
      <Styled.SectionWrapper gap={2}>
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

      <MiddleControls />

      <Styled.SectionWrapper gap={2}>
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
