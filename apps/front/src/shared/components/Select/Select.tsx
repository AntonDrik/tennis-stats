import { Text, Select as RadixSelect, Flex } from '@radix-ui/themes';
import React, { ReactElement, useCallback } from 'react';
import { IFieldErrors } from '../../../utils/get-text-field-error';

type TElement = React.ElementRef<typeof RadixSelect.Root>;

interface IProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Root> {
  label?: string;
  error?: IFieldErrors['error'];
  helperText?: IFieldErrors['helperText'] | string;
  children: ReactElement | ReactElement[];
}

const Select = React.forwardRef<TElement, IProps>((props, forwardedRef) => {
  const getHelperTextJSX = useCallback(() => {
    if (typeof props.helperText === 'string') {
      return (
        <Text size={'1'} weight={'light'}>
          {props.helperText}
        </Text>
      );
    }

    return props.helperText;
  }, [props.helperText]);

  return (
    <Flex direction={'column'} gap={'1'} width={'100%'}>
      {props.label && (
        <Text size="2" weight={'medium'}>
          {props.label}
        </Text>
      )}

      <RadixSelect.Root {...props}>{props.children}</RadixSelect.Root>

      {getHelperTextJSX()}
    </Flex>
  );
});

export default Select;
