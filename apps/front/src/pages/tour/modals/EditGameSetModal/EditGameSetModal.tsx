import DialogContent from '@mui/material/DialogContent';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { tourPageStateAtom } from '../../../../core/store';

import { Spinner, useModal } from '../../../../shared/components';
import FinishButton from '../../../../shared/components/GameSet/FinishButton/FinishButton';
import ScoreBlock from '../../../../shared/components/GameSet/ScoreBlock/ScoreBlock';
import ModalHeader from '../components/Header/Header';


function EditGameSetModal() {

  const isMutating = useIsMutating(['update-game-set-score']);

  const tourPageState = useAtomValue(tourPageStateAtom);

  const modal = useModal();

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader title={(set) => `Редактировать счет для сета № ${set?.number}`} />

      <DialogContent>
        <ScoreBlock tourPageState={tourPageState} />

        <FinishButton
          editMode
          tourPageState={tourPageState}
          onSuccess={modal.close}
        />
      </DialogContent>
    </>
  );

}

export default EditGameSetModal;
