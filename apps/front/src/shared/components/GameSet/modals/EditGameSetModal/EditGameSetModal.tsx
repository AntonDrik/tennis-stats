import DialogContent from '@mui/material/DialogContent';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { tournamentAtom } from '../../../../../core/store';

import { Spinner, useModal } from '../../../index';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import ModalHeader from '../components/Header/Header';

function EditGameSetModal() {
  const isMutating = useIsMutating(['update-game-set-score']);

  const tourPageState = useAtomValue(tournamentAtom);

  const modal = useModal();

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader
        title={(set) => `Редактировать счет для сета № ${set?.number}`}
      />

      <DialogContent>
        <ScoreBlock tournamentState={tourPageState} />

        <FinishButton
          editMode
          tournamentState={tourPageState}
          onSuccess={modal.close}
        />
      </DialogContent>
    </>
  );
}

export default EditGameSetModal;
