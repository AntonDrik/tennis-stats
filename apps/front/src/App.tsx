import 'reflect-metadata';
import { Provider } from 'jotai';
import React, { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from './core/api';
import { meStore } from './core/store';
import { AppRoutes } from './routes/routes';
import { ModalContainer, Toaster } from './shared/components';
import GlobalStyles from './theme/globalStyles';
import ThemeConfig from './theme/themeConfig';

export default function App(): ReactElement {
  return (
    <ThemeConfig>
      <Provider store={meStore}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <AppRoutes />
          <ModalContainer />
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </ThemeConfig>
  );
}
