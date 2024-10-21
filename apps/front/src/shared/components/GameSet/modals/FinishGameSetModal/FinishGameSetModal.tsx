import { Dialog, Flex } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import * as React from 'react';
import { tournamentAtom } from '../../../../../core/store';

import { useModal } from '../../../index';
import { DialogCloseButton } from '../../../Modals';
import FinishButton from '../../FinishButton/FinishButton';
import ScoreBlock from '../../ScoreBlock/ScoreBlock';
import { scoreAtom } from '../../ScoreBlock/state/Score.state';
import ModalHeader from '../components/Header/Header';

function FinishGameSetModal() {
  const tournamentState = useAtomValue(tournamentAtom);
  const setScore = useSetAtom(scoreAtom);

  const modal = useModal();

  const handleSuccessFinish = () => modal.close();

  useEffect(() => {
    setScore([0, 0]);
  }, [setScore]);

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
