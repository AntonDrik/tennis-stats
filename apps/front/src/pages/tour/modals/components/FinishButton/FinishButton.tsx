import Button from '@mui/material/Button';
import { EGameSetStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { useFinishGameSetMutation } from '../../../../../core/api';
import { tourPageStateAtom } from '../../../TourPage.state';
import { isValidScoreAtom, scoreAtom } from '../ScoreBlock/state/Score.state';
import useEditGameSetScoreMutation from '../../../../../core/api/gameSetApi/useEditGameSetScoreMutation';


interface IProps {
  editMode?: boolean;
  onSuccess: () => void;
}

function FinishButton(props: IProps) {

  const score = useAtomValue(scoreAtom);
  const isValidScore = useAtomValue(isValidScoreAtom);
  const tourPageState = useAtomValue(tourPageStateAtom);

  const finishGameSet = useFinishGameSetMutation(tourPageState);
  const editGameSetScore = useEditGameSetScoreMutation(tourPageState);

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
