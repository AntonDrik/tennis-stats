import { Dialog, Flex } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import * as React from 'react';
import { tournamentAtom } from '../../../../../core/store';

import { useModal, DialogCloseButton } from '../../../index';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import { scoreAtom } from '../../ScoreBlock/state/Score.state';
import ModalHeader from '../components/Header/Header';

function EditGameSetModal() {
  const tournamentState = useAtomValue(tournamentAtom);
  const setScore = useSetAtom(scoreAtom);

  const modal = useModal();

  useEffect(() => {
    setScore([0, 0]);
  }, [setScore]);

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
