import DialogContent from '@mui/material/DialogContent';
import { TScore } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import ms from 'ms';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { useUpdateGameSetScoreMutation } from '../../../../core/api';
import { Spinner, useModal } from '../../../../shared/components';
import { tourPageStateAtom } from '../../TourPage.state';
import FinishButton from '../components/FinishButton/FinishButton';
import ModalHeader from '../components/Header/Header';
import ScoreBlock from '../components/ScoreBlock/ScoreBlock';
import { resetServeAtom } from '../components/ScoreBlock/state/Serve.state';


function InProcessGameSetModal() {

  const clearServe = useSetAtom(resetServeAtom);
  const tourState = useAtomValue(tourPageStateAtom);

  const isMutating = useIsMutating(['finish-game-set']);
  const updateScore = useUpdateGameSetScoreMutation(tourState);

  const modal = useModal();

  const handleScoreChange = (score: [TScore, TScore]) => {
    updateScore.mutate({
      player1Score: score[0],
      player2Score: score[1]
    });
  };

  const handleSuccessFinish = () => {
    modal.close();
    clearServe();
  };

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader showRatingDelta />

      <DialogContent>
        <ScoreBlock
          interactive
          refetchIntervalMs={ms('5s')}
          onChange={handleScoreChange}
        />

        <FinishButton onSuccess={handleSuccessFinish} />
      </DialogContent>
    </>
  );
}

export default InProcessGameSetModal;
