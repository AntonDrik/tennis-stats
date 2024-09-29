import DialogContent from '@mui/material/DialogContent';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { useIsMutating } from 'react-query';
import { tournamentAtom } from '../../../../../core/store';

import { Spinner, useModal } from '../../../index';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import ModalHeader from '../components/Header/Header';

function FinishGameSetModal() {
  const isMutating = useIsMutating(['finish-game-set']);

  const tournamentState = useAtomValue(tournamentAtom);

  const modal = useModal();

  const handleSuccessFinish = () => modal.close();

  return (
    <>
      {isMutating > 0 && <Spinner />}

      <ModalHeader title={(set) => `Завершить сет № ${set?.number}`} />

      <DialogContent>
        <ScoreBlock tournamentState={tournamentState} />

        <FinishButton
          tournamentState={tournamentState}
          onSuccess={handleSuccessFinish}
        />
      </DialogContent>
    </>
  );
}

export default FinishGameSetModal;
