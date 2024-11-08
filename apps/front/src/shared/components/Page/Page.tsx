import { Box } from '@radix-ui/themes';
import React, { ReactNode, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import ErrorFallback from '../ErrorFallback/error-fallback';

interface IProps {
  title: string;
  scrollTop?: boolean;
  children: ReactNode;
}

function Page({ title, scrollTop = false, children }: IProps): JSX.Element {
  useEffect(() => {
    if (scrollTop) {
      document.querySelector('#content-container')?.scrollTo(0, 0);
    }
  }, [scrollTop]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Helmet titleTemplate='%s'>
        <title>{title}</title>
      </Helmet>

      <Box p={'4'}>{children}</Box>
    </ErrorBoundary>
  );
}

export default Page;
