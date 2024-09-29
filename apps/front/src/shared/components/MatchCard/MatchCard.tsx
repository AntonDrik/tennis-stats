import { useSetAtom } from 'jotai';
import { MouseEvent } from 'react';
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
}

function MatchCard({ match }: IProps) {
  const updateTournamentState = useSetAtom(updateTournamentAtom);

  const [isSettingsOpened, setIsSettingsOpened] = useState(false);

  const modal = useModal();

  const isPlayer1Winner = match.totalScore.user1 > match.totalScore.user2;
  const isPlayer2Winner = match.totalScore.user2 > match.totalScore.user1;

  const toggleSettings = () => {
    setIsSettingsOpened(!isSettingsOpened);

    updateTournamentState({ selectedMatch: match });
  };

  const setScore = (e: MouseEvent, gameSet: IGameSet) => {
    e.stopPropagation();

    updateTournamentState({ selectedMatch: match, selectedGameSet: gameSet });

    modal.open(
      gameSet.endDate ? <EditGameSetModal /> : <FinishGameSetModal />,
      { maxWidth: 'sm', fullWidth: true }
    );
  };

  return (
    <Styled.Container $isOpened={isSettingsOpened} onClick={toggleSettings}>
      <Styled.Row direction={'row'}>
        <Stack flex={1}>
          <Styled.Username variant={'h4'} textTransform={'uppercase'} mb={0.5}>
            {match.user1.nickname}
          </Styled.Username>

          <Divider color={'#8EC8F6'} sx={{ ml: '-12px' }} />

          <Styled.Username variant={'h4'} textTransform={'uppercase'} mt={0.5}>
            {match.user2.nickname}
          </Styled.Username>
        </Stack>

        <Stack direction={'row'} gap={1.5}>
          <Stack>
            <Styled.MatchScore $isWin={isPlayer1Winner}>
              <Typography fontWeight={600}>{match.totalScore.user1}</Typography>
            </Styled.MatchScore>

            <Divider color={'#8EC8F6'} />

            <Styled.MatchScore $isWin={isPlayer2Winner}>
              <Typography fontWeight={600}>{match.totalScore.user2}</Typography>
            </Styled.MatchScore>
          </Stack>

          <Stack direction={'row'}>
            {match.gameSets.map((gameSet) => (
              <Styled.ScoreContainer key={gameSet.id}>
                <Styled.SetScore
                  $isWin={gameSet.player1.isWinner}
                  onClick={(e: MouseEvent) => setScore(e, gameSet)}
                >
                  <Typography>{gameSet.player1.score}</Typography>
                </Styled.SetScore>

                <Divider color={'#8EC8F6'} sx={{ mx: '-12px' }} />

                <Styled.SetScore
                  $isWin={gameSet.player2.isWinner}
                  onClick={(e: MouseEvent) => setScore(e, gameSet)}
                >
                  <Typography>{gameSet.player2.score}</Typography>
                </Styled.SetScore>
              </Styled.ScoreContainer>
            ))}
          </Stack>
        </Stack>
      </Styled.Row>

      <Divider color={'#8EC8F6'} sx={{ mt: 2 }}>
        Настройки
      </Divider>

      <MatchCardControls />
    </Styled.Container>
  );
}

export default MatchCard;
