import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import useSuspensefulMoviesData from 'hooks/suspenseful/useSuspensefulMoviesData';
import { SWIPER_BREAKPOINTS, AUTOPLAY_SETTINGS } from './constants';

import CarouselImage from './CarouselImage';

import './styles.scss';

function Carousel({ genreId, genreName }) {
  const { results } = useSuspensefulMoviesData(genreId);
  return (
    <section className="m-t-10 m-b-20">
      <h2 className="m-b-20">{genreName}</h2>
      <div className="carousel-wrapper">
        <Swiper
          autoplay={AUTOPLAY_SETTINGS}
          modules={[Autoplay]}
          loop
          breakpoints={SWIPER_BREAKPOINTS}
        >
          {results.map((movie) => (
            <SwiperSlide key={`carousel_${genreName}_${movie.id}`}>
              <Link to={`details/${genreId}/${movie.id}`}>
                <CarouselImage
                  posterPath={movie.poster_path}
                  movieTitle={movie.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

Carousel.propTypes = {
  genreName: string,
  genreId: string,
};

export default Carousel;
