import { Dialog } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import React from 'react';
import { modalAtom } from './Modal.state';

function ModalContainer(): JSX.Element {
  const [state, setState] = useAtom(modalAtom);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setState({ component: null });
    }
  };

  return (
    <Dialog.Root open={Boolean(state.component)} onOpenChange={handleOpenChange}>
      {state.component}
    </Dialog.Root>
  );
}

export default ModalContainer;
