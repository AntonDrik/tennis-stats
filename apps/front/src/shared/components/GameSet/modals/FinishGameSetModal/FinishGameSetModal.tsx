import { Dialog, Flex } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { tournamentAtom } from '../../../../../core/store';

import { useModal } from '../../../index';
import { DialogCloseButton } from '../../../Modals';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import ModalHeader from '../components/Header/Header';

function FinishGameSetModal() {
  const tournamentState = useAtomValue(tournamentAtom);

  const modal = useModal();

  const handleSuccessFinish = () => modal.close();

  return (
    <Dialog.Content>
      <DialogCloseButton />

      <ModalHeader title={(set) => `Завершить сет № ${set?.number}`} />

      <Flex direction={'column'} mt={'6'}>
        <ScoreBlock tournamentState={tournamentState} />

        <FinishButton tournamentState={tournamentState} onSuccess={handleSuccessFinish} />
      </Flex>
    </Dialog.Content>
  );
}

export default FinishGameSetModal;
