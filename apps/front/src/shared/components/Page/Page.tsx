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
      <Helmet titleTemplate="%s | Tennis stats">
        <title>{title}</title>
      </Helmet>
      {children}
    </ErrorBoundary>
  );
}

export default Page;
