import { Flex } from '@radix-ui/themes';
import { IGameSet, IMatch } from '@tennis-stats/types';
import React, { memo, MouseEvent } from 'react';
import { useIsMutating } from 'react-query';
import Spinner from '../../../../Spinner/Spinner';
import Styled from '../../MatchCard.styles';

interface IProps {
  match: IMatch;
  isPlayoffCard: boolean | undefined;
  onSetScoreClick: (gameSet: IGameSet) => void;
}

function ScoreBlock(props: IProps) {
  const { match, isPlayoffCard } = props;

  const isFinishingSet = useIsMutating([`finish-game-set-${match.id}`]);

  const isPlayer1Winner = match.totalScore.user1 > match.totalScore.user2;
  const isPlayer2Winner = match.totalScore.user2 > match.totalScore.user1;

  const handleSetScore = (e: MouseEvent, gameSet: IGameSet) => {
    e.stopPropagation();

    props.onSetScoreClick(gameSet);
  };

  return (
    <Flex direction={'row'} position={'relative'}>
      {isFinishingSet > 0 && <Spinner />}

      <Flex direction={'column'}>
        <Styled.MatchScore $isWin={isPlayer1Winner}>
          <Styled.TextMeduim weight={'medium'}>
            {match.totalScore.user1}
          </Styled.TextMeduim>
        </Styled.MatchScore>

        <Styled.Divider $isPlayoffCard={isPlayoffCard} />

        <Styled.MatchScore $isWin={isPlayer2Winner}>
          <Styled.TextMeduim weight={'medium'}>
            {match.totalScore.user2}
          </Styled.TextMeduim>
        </Styled.MatchScore>
      </Flex>

      <Flex
        direction={'row'}
        style={{ borderRight: isPlayoffCard ? '7px solid var(--sage-7)' : 'none' }}
      >
        {match.gameSets.map((gameSet) => (
          <Styled.ScoreContainer
            key={gameSet.id}
            onClick={(e: MouseEvent) => handleSetScore(e, gameSet)}
          >
            <Styled.SetScore>
              <Styled.TextMeduim weight={'medium'}>
                {gameSet.player1?.score ?? 0}
              </Styled.TextMeduim>
            </Styled.SetScore>

            <Styled.Divider $isPlayoffCard={isPlayoffCard} />

            <Styled.SetScore>
              <Styled.TextMeduim weight={'medium'}>
                {gameSet.player2?.score ?? 0}
              </Styled.TextMeduim>
            </Styled.SetScore>
          </Styled.ScoreContainer>
        ))}
      </Flex>
    </Flex>
  );
}

export default memo(ScoreBlock);
