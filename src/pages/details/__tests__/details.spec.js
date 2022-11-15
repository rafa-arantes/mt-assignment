/* eslint-disable no-undef */
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, waitForElementToBeRemoved, act } from '@testing-library/react';
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

const errorHandler = [rest.get('http://api.themoviedb.org/3/movie/900667', (req, res, ctx) => res(ctx.status(500), ctx.json(null)))];

const server = setupServer(
  rest.get('http://api.themoviedb.org/3/movie/900667', (req, res, ctx) => res(ctx.json(DETAILS_MOCK))),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
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

    expect(screen.queryByText(DETAILS_MOCK.title)).toBeTruthy();
    expect(screen.queryByText(DETAILS_MOCK.overview)).toBeTruthy();
  });

  it('Changes button description after clicking it', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Details />
      </QueryClientProvider>,
    );

    await act(() => userEvent.click(screen.queryByText('Add to Wishlist')));
    expect(screen.queryByText('Remove from Wishlist')).toBeTruthy();

    await userEvent.click(screen.queryByText('Remove from Wishlist'));
    expect(screen.queryByText('Add to Wishlist')).toBeTruthy();
  });
});

// ERROR TESTING

const errorQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Details Page with Error', () => {
  console.error = jest.fn(); // Suppress error messages
  test('Shows Loading on first load', async () => {
    server.use(...errorHandler);
    const screen = render(
      <QueryClientProvider client={errorQueryClient}>
        <Details />
      </QueryClientProvider>,
    );
    await waitForElementToBeRemoved(await screen.findByTestId('loading'));
  });

  test('Shows Movie data after loading', async () => {
    server.use(...errorHandler);
    const screen = render(
      <QueryClientProvider client={errorQueryClient}>
        <Details />
      </QueryClientProvider>,
    );

    expect(screen.queryByText('Something went wrong:')).toBeTruthy();
    expect(screen.queryByText('Request failed with status code 500')).toBeTruthy();
  });
});
