import { Dialog } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { modalAtom } from './Modal.state';

function ModalContainer(): JSX.Element {
  const [state, setState] = useAtom(modalAtom);

  const handleClose = () => {
    setState({
      component: null,
      props: null,
    });
  };

  return (
    <Dialog
      disableEnforceFocus
      open={Boolean(state.component)}
      onClose={handleClose}
      {...state.props}
    >
      {state.component}
    </Dialog>
  );
}

export default ModalContainer;
