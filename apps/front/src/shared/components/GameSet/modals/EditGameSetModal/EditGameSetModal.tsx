import { Dialog, Flex } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { tournamentAtom } from '../../../../../core/store';

import { useModal, DialogCloseButton } from '../../../index';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import ModalHeader from '../components/Header/Header';

function EditGameSetModal() {
  const tournamentState = useAtomValue(tournamentAtom);

  const modal = useModal();

  return (
    <Dialog.Content>
      <DialogCloseButton />

      <ModalHeader title={(set) => `Редактировать счет для сета № ${set?.number}`} />

      <Flex direction={'column'} mt={'6'}>
        <ScoreBlock tournamentState={tournamentState} />

        <FinishButton
          editMode
          tournamentState={tournamentState}
          onSuccess={modal.close}
        />
      </Flex>
    </Dialog.Content>
  );
}

export default EditGameSetModal;
