import { useAtomValue, useSetAtom } from 'jotai';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { IGameSet, IMatch } from '@tennis-stats/types';
import { Flex, Separator } from '@radix-ui/themes';
import { tournamentAtom, updateTournamentAtom } from '../../../../core/store';
import { useCanManageTournament } from '../../../../pages/tournament/hooks';
import { EditGameSetModal, FinishGameSetModal } from '../../GameSet';
import { useModal } from '../../Modals';
import MatchCardControls from './components/MatchCardControls';
import Styled from './MatchCard.styles';

interface IProps {
  match: IMatch;
  isPlayoffCard?: boolean;
}

function MatchCard({ match, isPlayoffCard }: IProps) {
  const tournamentState = useAtomValue(tournamentAtom);
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const modal = useModal();
  const canManageTournament = useCanManageTournament();

  const isEmptyMatch = !match.user1 || !match.user2;
  const isPlayer1Winner = match.totalScore.user1 > match.totalScore.user2;
  const isPlayer2Winner = match.totalScore.user2 > match.totalScore.user1;

  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);

  const isCanOpenSettings = useMemo(() => {
    return tournamentState.selectedMatch?.id === match.id;
  }, [match, tournamentState.selectedMatch]);

  const toggleSettings = () => {
    if (isPlayoffCard || !canManageTournament) {
      return;
    }

    updateTournamentState({ selectedMatch: match });
    setIsSettingsOpened(!isSettingsOpened);
  };

  const setScore = (e: MouseEvent, gameSet: IGameSet) => {
    e.stopPropagation();

    if (isEmptyMatch || !canManageTournament) {
      return;
    }

    updateTournamentState({ selectedMatch: match, selectedGameSet: gameSet });

    modal.open(gameSet.isFinished ? <EditGameSetModal /> : <FinishGameSetModal />);
  };

  useEffect(() => {
    if (!isCanOpenSettings) {
      setIsSettingsOpened(false);
    }
  }, [isCanOpenSettings]);

  return (
    <Styled.Container
      $isOpened={isCanOpenSettings && isSettingsOpened}
      onClick={toggleSettings}
    >
      <Styled.Row>
        <Flex direction={'column'} style={{ flex: 1 }}>
          <Styled.Username mb={'1'} weight={'medium'}>
            {match.user1?.nickname ?? 'Не определено'}
          </Styled.Username>

          <Styled.Divider $isPlayoffCard={isPlayoffCard} />

          <Styled.Username mt={'1'} weight={'medium'}>
            {match.user2?.nickname ?? 'Не определено'}
          </Styled.Username>
        </Flex>

        <Flex direction={'row'}>
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
            style={{ borderRight: isPlayoffCard ? '4px solid var(--blue-7)' : 'none' }}
          >
            {match.gameSets.map((gameSet) => (
              <Styled.ScoreContainer
                key={gameSet.id}
                onClick={(e: MouseEvent) => setScore(e, gameSet)}
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
      </Styled.Row>

      {!isPlayoffCard && (
        <React.Fragment>
          <Separator size={'4'} ml={'3'} style={{ backgroundColor: 'var(--blue-7)' }} />

          <MatchCardControls />
        </React.Fragment>
      )}
    </Styled.Container>
  );
}

export default MatchCard;
