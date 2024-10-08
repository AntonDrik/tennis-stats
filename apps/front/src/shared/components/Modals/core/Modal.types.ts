import { ReactElement } from 'react';

interface IModalState {
  component: ReactElement | null;
}

interface IModal {
  open: (component: ReactElement) => void;
  close: () => void;
}

export { IModalState, IModal };
