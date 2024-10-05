import { useSetAtom } from 'jotai';
import React, { MouseEvent } from 'react';
import { Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { IGameSet, IMatch } from '@tennis-stats/types';
import { useState } from 'react';
import { updateTournamentAtom } from '../../../core/store';
import { EditGameSetModal, FinishGameSetModal } from '../GameSet';
import { useModal } from '../Modals';
import MatchCardControls from './components/MatchCardControls';
import Styled from './MatchCard.styles';

interface IProps {
  match: IMatch;
  isPlayoffCard?: boolean;
}

function MatchCard({ match, isPlayoffCard }: IProps) {
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const [isSettingsOpened, setIsSettingsOpened] = useState(false);

  const modal = useModal();

  const isEmptyMatch = !match.user1 || !match.user2;
  const isPlayer1Winner = match.totalScore.user1 > match.totalScore.user2;
  const isPlayer2Winner = match.totalScore.user2 > match.totalScore.user1;

  const toggleSettings = () => {
    if (isPlayoffCard) {
      return;
    }

    setIsSettingsOpened(!isSettingsOpened);

    updateTournamentState({ selectedMatch: match });
  };

  const setScore = (e: MouseEvent, gameSet: IGameSet) => {
    e.stopPropagation();

    if (isEmptyMatch) {
      return;
    }

    updateTournamentState({ selectedMatch: match, selectedGameSet: gameSet });

    modal.open(gameSet.isFinished ? <EditGameSetModal /> : <FinishGameSetModal />, {
      maxWidth: 'sm',
      fullWidth: true,
    });
  };

  return (
    <Styled.Container $isOpened={isSettingsOpened} onClick={toggleSettings}>
      <Styled.Row direction={'row'}>
        <Stack flex={1}>
          <Styled.Username variant={'body1'} textTransform={'uppercase'} mb={0.5}>
            {match.user1?.nickname ?? 'Не определено'}
          </Styled.Username>

          <Styled.Divider sx={{ ml: '-12px' }} />

          <Styled.Username variant={'body1'} textTransform={'uppercase'} mt={0.5}>
            {match.user2?.nickname ?? 'Не определено'}
          </Styled.Username>
        </Stack>

        <Stack direction={'row'}>
          <Stack>
            <Styled.MatchScore $isWin={isPlayer1Winner}>
              <Typography fontWeight={600}>{match.totalScore.user1}</Typography>
            </Styled.MatchScore>

            <Styled.Divider />

            <Styled.MatchScore $isWin={isPlayer2Winner}>
              <Typography fontWeight={600}>{match.totalScore.user2}</Typography>
            </Styled.MatchScore>
          </Stack>

          <Stack
            direction={'row'}
            sx={{ borderRight: isPlayoffCard ? '4px solid #53709b' : 'none' }}
          >
            {match.gameSets.map((gameSet) => (
              <Styled.ScoreContainer
                key={gameSet.id}
                onClick={(e: MouseEvent) => setScore(e, gameSet)}
              >
                <Styled.SetScore $isWin={gameSet.player1?.isWinner}>
                  <Typography>{gameSet.player1?.score ?? 0}</Typography>
                </Styled.SetScore>

                <Styled.Divider />

                <Styled.SetScore $isWin={gameSet.player2?.isWinner}>
                  <Typography>{gameSet.player2?.score ?? 0}</Typography>
                </Styled.SetScore>
              </Styled.ScoreContainer>
            ))}
          </Stack>
        </Stack>
      </Styled.Row>

      {!isPlayoffCard && (
        <React.Fragment>
          <Divider color={'#8EC8F6'} sx={{ mt: 2 }}>
            Настройки
          </Divider>

          <MatchCardControls />
        </React.Fragment>
      )}
    </Styled.Container>
  );
}

export default MatchCard;
