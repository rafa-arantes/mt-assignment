import React from 'react';
import { useParams } from 'react-router-dom';
import useSuspensefulMovieDetailsData from 'hooks/suspenseful/useSuspensefulMovieDetailsData';

function AdditionalInfo() {
  const { movieId } = useParams();
  const { data } = useSuspensefulMovieDetailsData(movieId);
  return (
    <>
      <p>
        <b>PG 18:</b>
        {' '}
        {data.adult ? 'yes' : 'no'}
      </p>
      <p>
        <b>Release:</b>
        {' '}
        {data.release_date}
      </p>
      <p>
        <b>Length:</b>
        {' '}
        {data.runtime}
        {' '}
        Minutes
      </p>
      <p>
        <b>Score:</b>
        {' '}
        {data.vote_average.toFixed(1)}
        {' '}
        out of 10
      </p>
    </>
  );
}

export default AdditionalInfo;
