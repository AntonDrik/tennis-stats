import { Dialog } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import React from 'react';
import { modalAtom } from './Modal.state';

function ModalContainer(): JSX.Element | null {
  const [state, setState] = useAtom(modalAtom);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setState({ component: null });
    }
  };

  if (!state.component) {
    return null;
  }

  return (
    <Dialog.Root open onOpenChange={handleOpenChange}>
      {state.component}
    </Dialog.Root>
  );
}

export default ModalContainer;
