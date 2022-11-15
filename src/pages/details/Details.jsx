import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import LoadingScreen from 'components/Loading';
import ErrorFallback from 'components/ErrorFallback';

import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import MovieDescription from './MovieDescription/MovieDescription';
import Poster from './Poster/Poster';

import './styles.scss';

function Details() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>
        <main className="poster-description-section center-flex m-t-20">
          <Poster />
          <MovieDescription />
        </main>
        <aside className="additional-info-section m-t-20">
          <AdditionalInfo />
        </aside>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Details;
