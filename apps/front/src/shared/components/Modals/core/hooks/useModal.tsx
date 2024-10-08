import { useSetAtom } from 'jotai';
import { ReactElement } from 'react';
import { IModal } from '../Modal.types';
import { modalAtom } from '../Modal.state';

function useModal(): IModal {
  const setModal = useSetAtom(modalAtom);

  const open = (component: ReactElement) => {
    setModal({ component });
  };

  const close = () => setModal({ component: null });

  return { open, close };
}

export default useModal;
