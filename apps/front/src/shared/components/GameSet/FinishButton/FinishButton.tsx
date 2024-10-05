import Button from '@mui/material/Button';
import { useAtomValue } from 'jotai';
import { useEditGameSetMutation, useFinishGameSetMutation } from '../../../../core/api';
import { ITournamentState } from '../../../../core/store';
import { isValidScoreAtom, scoreAtom } from '../ScoreBlock/state/Score.state';

interface IProps {
  tournamentState: ITournamentState;
  editMode?: boolean;
  onSuccess: () => void;
}

function FinishButton(props: IProps) {
  const score = useAtomValue(scoreAtom);
  const isValidScore = useAtomValue(isValidScoreAtom);

  const finishGameSet = useFinishGameSetMutation(props.tournamentState);
  const editGameSetScore = useEditGameSetMutation(props.tournamentState);

  const handleFinishClick = () => {
    if (!props.editMode) {
      finishGameSet
        .mutateAsync({
          player1Score: score[0],
          player2Score: score[1],
        })
        .then(props.onSuccess);

      return;
    }

    editGameSetScore
      .mutateAsync({
        player1Score: score[0],
        player2Score: score[1],
      })
      .then(props.onSuccess);
  };

  return (
    <Button
      variant={'contained'}
      fullWidth
      sx={{ mt: 2 }}
      disabled={!isValidScore}
      onClick={handleFinishClick}
    >
      {props.editMode ? 'Изменить счет' : 'Завершить сет'}
    </Button>
  );
}

export default FinishButton;
