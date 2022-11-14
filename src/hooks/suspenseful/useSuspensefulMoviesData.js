import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, API_KEY } from 'root/constants';

const moviesUrl = (genre) => `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${genre}`;

const useSuspensefulMoviesData = (genre) => {
  const {
    data: { results },
  } = useQuery(
    ['carousel-data', genre],
    () => axios(moviesUrl(genre)).then(({ data: res }) => res),
    { suspense: true, staleTime: Infinity },
  );

  return { results };
};

export default useSuspensefulMoviesData;
