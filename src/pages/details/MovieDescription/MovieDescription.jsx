import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { GENRES } from 'root/constants';
import useSuspensefulMovieDetailsData from 'hooks/suspenseful/useSuspensefulMovieDetailsData';
import useWishlist from 'hooks/useWishlist';

import './styles.scss';

function MovieDescription() {
  const { movieId, genreId } = useParams();
  const { data } = useSuspensefulMovieDetailsData(movieId);
  const { addMovie, removeMovie, isOnWishlist } = useWishlist();

  const handleWishlistClick = useCallback(
    () => (isOnWishlist(movieId) ? removeMovie(movieId) : addMovie(data)),
    [isOnWishlist, removeMovie, movieId, addMovie, data],
  );

  const categoryClassName = `details-${GENRES[genreId]?.toLowerCase()}-section`;

  return (
    <aside className={`${categoryClassName} aside-movie-description-container`}>
      <h2 className="m-b-15 ">Description</h2>
      <h3 className="m-b-10">{data.title}</h3>
      <p className="m-b-20">{data.overview}</p>
      <button type="button" className="m-t-15" onClick={handleWishlistClick}>
        {isOnWishlist(movieId) ? 'Remove from ' : 'Add to '}
        Wishlist
      </button>
    </aside>
  );
}

export default MovieDescription;
