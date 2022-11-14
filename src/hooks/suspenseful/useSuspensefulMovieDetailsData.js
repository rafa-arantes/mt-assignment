import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, API_KEY } from 'root/constants';

const movieDetailsUrl = (movieId) => `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;

const useSuspensefulMovieDetailsData = (movieId) => {
  const { data } = useQuery(
    ['details', movieId],
    () => axios(movieDetailsUrl(movieId)).then(({ data: res }) => res),
    { suspense: true, staleTime: Infinity },
  );

  return { data };
};

export default useSuspensefulMovieDetailsData;
