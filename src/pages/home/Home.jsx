import React, { Suspense } from 'react';
import LoadingScreen from 'components/Loading';
import { GENRES } from 'root/constants';
import Carousel from './Carousel/Carousel';
import './styles.scss';

const genreEntries = Object.entries(GENRES);

function Home() {
  return (
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
  );
}

export default Home;
