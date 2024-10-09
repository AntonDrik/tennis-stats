import { Text } from '@radix-ui/themes';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

import isDefined from './is-defined';

export interface IFieldErrors {
  error: boolean;
  helperText: JSX.Element | null;
}

const renderErrorMessage = <T extends FieldErrors>(errors: T, name: keyof T) => {
  if (!errors[name]) {
    return <></>;
  }

  const message = String(errors[name]?.message ?? '');

  return (
    <React.Fragment>
      {message.split('\n').map((i) => (
        <Text key={i} size={'1'} weight={'light'} color={'tomato'}>
          {i}
          <br />
        </Text>
      ))}
    </React.Fragment>
  );
};

function getTextFieldError<T extends FieldErrors>(
  errors: T,
  name: keyof T
): IFieldErrors {
  return {
    error: isDefined(errors[name]),
    helperText: renderErrorMessage(errors, name),
  };
}

export default getTextFieldError;
