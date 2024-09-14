import { useModal } from '../../core';
import ConfirmModal from '../ConfirmModal';


interface IProps {
  title: string;
  confirmTitle: string;
  denyTitle: string;
}

function useConfirmModal({ title, confirmTitle, denyTitle }: IProps) {

  const modal = useModal();

  return (onSuccess: () => void) => {
    modal.open(
      <ConfirmModal
        title={title}
        confirmButton={{
          caption: confirmTitle,
          onClick: () => {
            onSuccess();
            modal.close();
          },
          props: {
            color: 'error',
            variant: 'contained'
          }
        }}
        denyButton={{
          caption: denyTitle,
          onClick: () => modal.close(),
          props: {
            color: 'inherit',
            variant: 'contained'
          }
        }}
      />,
      { maxWidth: 'sm' }
    );
  };
}

export default useConfirmModal;
