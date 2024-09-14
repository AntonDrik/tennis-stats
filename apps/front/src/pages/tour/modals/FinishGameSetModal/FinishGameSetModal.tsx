import DialogContent from '@mui/material/DialogContent';
import { useAtomValue, useSetAtom } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { tourPageStateAtom } from '../../../../core/store';

import { Spinner, useModal } from '../../../../shared/components';
import FinishButton from '../../../../shared/components/GameSet/FinishButton/FinishButton';
import ScoreBlock from '../../../../shared/components/GameSet/ScoreBlock/ScoreBlock';
import { resetServeAtom } from '../../../../shared/components/GameSet/ScoreBlock/state/Serve.state';
import ModalHeader from '../components/Header/Header';


function FinishGameSetModal() {

  const isMutating = useIsMutating(['finish-game-set']);

  const clearServe = useSetAtom(resetServeAtom);
  const tourPageState = useAtomValue(tourPageStateAtom);

  const modal = useModal();

  const handleSuccessFinish = () => {
    modal.close();
    clearServe();
  };

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader title={(set) => `Завершить сет № ${set?.number}`} />

      <DialogContent>
        <ScoreBlock tourPageState={tourPageState} />

        <FinishButton
          tourPageState={tourPageState}
          onSuccess={handleSuccessFinish}
        />
      </DialogContent>
    </>
  );

}

export default FinishGameSetModal;
