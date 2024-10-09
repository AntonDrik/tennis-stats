import { Dialog, IconButton } from '@radix-ui/themes';
import * as React from 'react';
import { CloseIcon } from '../../../../svg-icons';

function DialogCloseButton() {
  return (
    <Dialog.Close style={{ position: 'absolute', right: 15, top: 15 }}>
      <IconButton variant={'ghost'} radius={'full'}>
        <CloseIcon />
      </IconButton>
    </Dialog.Close>
  );
}

export default DialogCloseButton;
