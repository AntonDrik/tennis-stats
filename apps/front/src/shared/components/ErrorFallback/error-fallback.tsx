import { Callout } from '@radix-ui/themes';
import React from 'react';
import { InfoIcon } from '../../svg-icons';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <Callout.Root color="red">
      <Callout.Icon>
        <InfoIcon />
      </Callout.Icon>
      <Callout.Text>Произошла ошибка: {error?.message}</Callout.Text>
    </Callout.Root>
  );
}

export default ErrorFallback;
