import { ButtonProps } from '@radix-ui/themes';
import { useModal } from '../../core';
import ConfirmModal from '../ConfirmModal';
import { IConfirmProps } from '../ConfirmModal.tyles';

export interface IConfirmModalProps {
  title: string;
  confirmTitle: string;
  denyTitle: string;

  description?: string | null;
  confirmButtonProps?: IConfirmProps['confirmButton']['props'];
  denyButtonProps?: IConfirmProps['denyButton']['props'];
}

function useConfirmModal(props: IConfirmModalProps) {
  const modal = useModal();

  const getButtonProps = (
    buttonType: 'confirmButtonProps' | 'denyButtonProps',
    defaultValue: ButtonProps,
    rewriteProps?: Partial<IConfirmModalProps>
  ) => {
    return rewriteProps?.[buttonType] || props[buttonType] || defaultValue;
  };

  return (onSuccess: () => void, rewriteProps?: Partial<IConfirmModalProps>) => {
    modal.open(
      <ConfirmModal
        title={rewriteProps?.title ?? props.title}
        description={rewriteProps?.description ?? props.description}
        confirmButton={{
          caption: rewriteProps?.confirmTitle ?? props.confirmTitle,
          onClick: () => {
            onSuccess();
            modal.close();
          },
          props: getButtonProps(
            'confirmButtonProps',
            { color: 'tomato', variant: 'soft' },
            rewriteProps
          ),
        }}
        denyButton={{
          caption: rewriteProps?.denyTitle ?? props.denyTitle,
          onClick: () => modal.close(),
          props: getButtonProps(
            'denyButtonProps',
            { color: 'gray', variant: 'soft' },
            rewriteProps
          ),
        }}
      />
    );
  };
}

export default useConfirmModal;
