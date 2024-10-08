import { ButtonProps } from '@radix-ui/themes';

export interface IConfirmProps {
  title: string;
  description?: string | null;
  confirmButton: {
    caption: string;
    onClick?: () => void;
    props?: ButtonProps;
  };
  denyButton: {
    caption: string;
    onClick?: () => void;
    props?: ButtonProps;
  };
}
