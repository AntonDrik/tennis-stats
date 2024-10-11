import 'reflect-metadata';
import { useAtomValue } from 'jotai';
import React, { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './reset.css';

import { queryClient } from './core/api';
import { appearanceAtom } from './core/store/appearance.store';
import { AppRoutes } from './routes/routes';
import { ModalContainer, Toaster } from './shared/components';

export default function App(): ReactElement {
  const appearance = useAtomValue(appearanceAtom);

  return (
    <Theme radius={'large'} panelBackground="solid" appearance={appearance}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ModalContainer />
        <Toaster />
      </QueryClientProvider>
    </Theme>
  );
}
