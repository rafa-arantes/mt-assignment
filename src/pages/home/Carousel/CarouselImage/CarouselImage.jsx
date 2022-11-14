import React, { useState } from 'react';
import { string } from 'prop-types';

import './styles.scss';

const carouselImagePath = (imagePath) => `https://image.tmdb.org/t/p/w188_and_h282_bestv2${imagePath}`;

function CarouselImage({ posterPath, movieTitle }) {
  const [loadStatus, setLoadStatus] = useState('not-loaded');
  return (
    <div className={`carousel-${loadStatus}`}>
      <div className="carousel-loading-fallback">{movieTitle}</div>
      <img
        src={carouselImagePath(posterPath)}
        alt={movieTitle}
        onLoad={() => setLoadStatus('loaded')}
      />
    </div>
  );
}

CarouselImage.propTypes = {
  posterPath: string,
  movieTitle: string,
};

export default CarouselImage;
