import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { Spinner, useModal } from '../../../../shared/components';

import FinishButton from '../components/FinishButton/FinishButton';
import ModalHeader from '../components/Header/Header';
import ScoreBlock from '../components/ScoreBlock/ScoreBlock';


function EditGameSetModal() {

  const isMutating = useIsMutating(['update-game-set-score']);

  const modal = useModal();

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader title={(set) => `Редактировать счет для сета № ${set?.number}`} />

      <DialogContent>
        <ScoreBlock />

        <FinishButton editMode onSuccess={modal.close} />
      </DialogContent>
    </>
  );

}

export default EditGameSetModal;
