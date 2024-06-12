import Button from '@mui/material/Button';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { useEditGameSetScoreMutation, useFinishGameSetMutation } from '../../../../core/api';
import { ITourPageState } from '../../../../core/store';
import { isValidScoreAtom, scoreAtom } from '../ScoreBlock/state/Score.state';


interface IProps {
  tourPageState: ITourPageState;
  editMode?: boolean;
  onSuccess: () => void;
}

function FinishButton(props: IProps) {

  const score = useAtomValue(scoreAtom);
  const isValidScore = useAtomValue(isValidScoreAtom);

  const finishGameSet = useFinishGameSetMutation(props.tourPageState);
  const editGameSetScore = useEditGameSetScoreMutation(props.tourPageState);

  const handleFinishClick = () => {

    if (!props.editMode) {
      finishGameSet.mutateAsync({
        player1Score: score[0],
        player2Score: score[1],
        status: EGameSetStatus.FINISHED
      }).then(props.onSuccess);

      return;
    }

    editGameSetScore.mutateAsync({
      player1Score: score[0],
      player2Score: score[1]
    }).then(props.onSuccess);
  };

  return (
    <Button
      variant={'contained'}
      fullWidth
      sx={{ mt: 2 }}
      disabled={!isValidScore}
      onClick={handleFinishClick}
    >{props.editMode ? 'Изменить счет' : 'Завершить сет'}</Button>
  );

}

export default FinishButton;
