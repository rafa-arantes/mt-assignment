import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { GENRES } from 'root/constants';

import LoadingScreen from 'components/Loading';
import ErrorFallback from 'components/ErrorFallback';

import Carousel from './Carousel/Carousel';
import './styles.scss';

const genreEntries = Object.entries(GENRES);

function Home() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>
        <main className="carousel-container">
          {genreEntries.map(([genreId, genreName]) => (
            <Carousel
              key={`genre_${genreId}`}
              genreId={genreId}
              genreName={genreName}
            />
          ))}
        </main>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Home;
