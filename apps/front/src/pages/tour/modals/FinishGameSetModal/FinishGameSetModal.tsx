import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { Spinner, useModal } from '../../../../shared/components';

import FinishButton from '../components/FinishButton/FinishButton';
import ModalHeader from '../components/Header/Header';
import ScoreBlock from '../components/ScoreBlock/ScoreBlock';
import { useSetAtom } from 'jotai';
import { resetServeAtom } from '../components/ScoreBlock/state/Serve.state';


function FinishGameSetModal() {

  const clearServe = useSetAtom(resetServeAtom);

  const isMutating = useIsMutating(['finish-game-set']);

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
        <ScoreBlock />

        <FinishButton onSuccess={handleSuccessFinish} />
      </DialogContent>
    </>
  );

}

export default FinishGameSetModal;
