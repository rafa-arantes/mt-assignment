import React, { Suspense } from 'react';
import LoadingScreen from 'components/Loading';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import MovieDescription from './MovieDescription/MovieDescription';
import Poster from './Poster/Poster';

import './styles.scss';

function Details() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="poster-description-section m-t-20">
        <Poster />
        <MovieDescription />
      </main>
      <aside className="additional-info-section m-t-20">
        <AdditionalInfo />
      </aside>
    </Suspense>
  );
}

export default Details;
