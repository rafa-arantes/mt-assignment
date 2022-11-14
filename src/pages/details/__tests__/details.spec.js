/* eslint-disable no-undef */
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import Details from '../Details';
import { DETAILS_MOCK } from './__mocks__/details_mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    movieId: 900667,
    genreId: 28,
  }),
}));

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/movie/:movieId', (req, res, ctx) => res(ctx.json(DETAILS_MOCK))),
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const queryClient = new QueryClient();

describe('Details Page', () => {
  it('Shows Loading on first load', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Details />
      </QueryClientProvider>,
    );
    await waitForElementToBeRemoved(await screen.findByTestId('loading'));
  });

  it('Shows Movie data after loading', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Details />
      </QueryClientProvider>,
    );

    expect(screen.queryByText(DETAILS_MOCK.title)).toBeDefined();
    expect(screen.queryByText(DETAILS_MOCK.overview)).toBeDefined();
  });

  it('Changes button description after clicking it', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Details />
      </QueryClientProvider>,
    );

    await userEvent.click(screen.queryByText('Add to Wishlist'));
    expect(screen.queryByText('Remove From Wishlist')).toBeDefined();

    await userEvent.click(screen.queryByText('Remove From Wishlist'));
    expect(screen.queryByText('Add to Wishlist')).toBeDefined();
  });
});
