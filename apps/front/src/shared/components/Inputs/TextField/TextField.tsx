import React, { useCallback } from 'react';
import { Flex, Text, TextField as RadixTextField } from '@radix-ui/themes';

import { IFieldErrors } from '../../../../utils/get-text-field-error';

type TElement = React.ElementRef<typeof RadixTextField.Root>;

interface IProps extends React.ComponentPropsWithoutRef<typeof RadixTextField.Root> {
  label?: string;
  error?: IFieldErrors['error'];
  helperText?: IFieldErrors['helperText'] | string;
}

const TextField = React.forwardRef<TElement, IProps>((props, forwardedRef) => {
  const { helperText, label, error, ...restProps } = props;

  const getHelperTextJSX = useCallback(() => {
    if (typeof helperText === 'string') {
      return (
        <Text size={'1'} weight={'light'}>
          {helperText}
        </Text>
      );
    }

    return helperText;
  }, [helperText]);

  return (
    <Flex direction={'column'} gap={'1'} width={'100%'}>
      {label && (
        <Text size="2" weight={'medium'}>
          {label}
        </Text>
      )}

      <RadixTextField.Root
        {...restProps}
        ref={forwardedRef}
        color={error ? 'tomato' : restProps.color}
        variant={error ? 'soft' : restProps.variant}
      />

      {getHelperTextJSX()}
    </Flex>
  );
});

export default TextField;
