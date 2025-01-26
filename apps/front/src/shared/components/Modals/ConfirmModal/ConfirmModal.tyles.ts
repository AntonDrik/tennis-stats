import { ButtonProps } from '@radix-ui/themes';
import { calloutRootPropDefs } from '@radix-ui/themes/src/components/callout.props';
import type { GetPropDefTypes } from '@radix-ui/themes/src/props/prop-def';

export interface ICalloutProps {
  text: string;
  color: GetPropDefTypes<typeof calloutRootPropDefs>['color'];
}

export interface IConfirmProps {
  title: string;
  description?: string | null;
  callout?: ICalloutProps;

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
