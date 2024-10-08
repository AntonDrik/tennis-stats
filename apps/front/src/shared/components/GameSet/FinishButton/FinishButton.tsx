import { Button, Spinner } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import { useIsMutating } from 'react-query';
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

  const isMutating = useIsMutating(['finish-game-set']);

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
      mt={'4'}
      size={'3'}
      color={'green'}
      disabled={!isValidScore || isMutating > 0}
      onClick={handleFinishClick}
    >
      {isMutating > 0 && <Spinner />}
      {props.editMode ? 'Изменить счет' : 'Завершить сет'}
    </Button>
  );
}

export default FinishButton;
