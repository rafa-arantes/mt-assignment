/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSuspensefulMovieDetailsData from 'hooks/suspenseful/useSuspensefulMovieDetailsData';
import './styles.scss';

const posterImagePath = (posterPath) => `https://image.tmdb.org/t/p/w342${posterPath}`;

function Poster() {
  const [loadStatus, setLoadStatus] = useState('not-loaded');

  const { movieId } = useParams();
  const { data } = useSuspensefulMovieDetailsData(movieId);

  return (
    <div className={`poster-${loadStatus}`}>
      <div className="poster-placeholder" />
      <img className="poster-image" alt={data.title} src={posterImagePath(data.poster_path)} onLoad={() => setLoadStatus('loaded')} />
    </div>
  );
}

export default Poster;
