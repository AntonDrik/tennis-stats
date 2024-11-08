import { useAtomValue, useSetAtom } from 'jotai';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { IGameSet, IMatch } from '@tennis-stats/types';
import { tournamentAtom, updateTournamentStateAtom } from '../../../../core/store';
import { useCanManageTournament } from '../../../../pages/tournament/hooks';
import { EditGameSetModal, FinishGameSetModal } from '../../GameSet';
import { useModal } from '../../Modals';
import MatchCardControls from './components/MatchCardControls/MatchCardControls';
import ScoreBlock from './components/ScoreBlock/ScoreBlock';
import MatchUsernameBlock from './components/UsernameBlock/UsernameBlock';
import useCanChangeGameSet from './hooks/useCanChangeGameSet';
import Styled from './MatchCard.styles';

interface IProps {
  match: IMatch;
  isPlayoffCard?: boolean;
}

function MatchCard({ match, isPlayoffCard }: IProps) {
  const tournamentState = useAtomValue(tournamentAtom);
  const updateTournamentState = useSetAtom(updateTournamentStateAtom);

  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);

  const modal = useModal();
  const canChangeGameSet = useCanChangeGameSet(match);
  const canManageTournament = useCanManageTournament();

  const isEmptyMatch = !match.user1 || !match.user2;
  const isCanOpenSettings = tournamentState.selectedMatch?.id === match.id;

  const toggleSettings = () => {
    if (isPlayoffCard || !canManageTournament) {
      return;
    }

    updateTournamentState({ selectedMatch: match });
    setIsSettingsOpened(!isSettingsOpened);
  };

  const setScore = useCallback(
    (gameSet: IGameSet) => {
      if (isEmptyMatch || !canChangeGameSet) {
        return;
      }

      updateTournamentState({ selectedMatch: match, selectedGameSet: gameSet });

      modal.open(gameSet.isFinished ? <EditGameSetModal /> : <FinishGameSetModal />);
    },
    [isEmptyMatch, match, canManageTournament]
  );

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
        <MatchUsernameBlock
          user1={match.user1}
          user2={match.user2}
          isPlayoffCard={isPlayoffCard}
        />

        <ScoreBlock
          match={match}
          isPlayoffCard={isPlayoffCard}
          onSetScoreClick={setScore}
        />
      </Styled.Row>

      {!isPlayoffCard && <MatchCardControls tournamentState={tournamentState} />}
    </Styled.Container>
  );
}

export default memo(MatchCard);
