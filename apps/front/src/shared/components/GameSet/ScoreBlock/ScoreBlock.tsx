import { Box, Flex, Separator } from '@radix-ui/themes';
import { TScore } from '@tennis-stats/types';
import { useAtom } from 'jotai';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetGameSetQuery } from '../../../../core/api';
import { ITournamentState } from '../../../../core/store';
import PlayerLabel from './components/PlayerLabel/PlayerLabel';
import ScoreSelector from './components/ScoreSelector/ScoreSelector';
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
      type === 'player1' ? [value as TScore, score[1]] : [score[0], value as TScore];

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
    <Flex>
      <Styled.SectionWrapper gap={'2'} pr={'4'}>
        <PlayerLabel player={gameSet?.player1} number={1} />

        <ScoreSelector
          value={value1}
          onChange={(value) => {
            handleChangeInput('player1', value);
          }}
        />
      </Styled.SectionWrapper>

      <Box>
        <Separator orientation="vertical" size={'4'} style={{ width: 2 }} />
      </Box>

      <Styled.SectionWrapper gap={'2'} pl={'4'}>
        <PlayerLabel player={gameSet?.player2} number={2} />

        <ScoreSelector
          value={value2}
          onChange={(value) => {
            handleChangeInput('player2', value);
          }}
        />
      </Styled.SectionWrapper>
    </Flex>
  );
}

export default ScoreBlock;
