/* eslint-disable no-undef */
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { MemoryRouter } from 'react-router';
import Home from '../Home';
import { HOME_MOCK } from './__mocks__/home_mock';

const server = setupServer(
  rest.get('http://api.themoviedb.org/3/discover/movie', (req, res, ctx) => res(ctx.json(HOME_MOCK))),
);

const errorHandler = [
  rest.get('http://api.themoviedb.org/3/movie/900667', (req, res, ctx) => res(ctx.status(500), ctx.json(null))),
];

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

describe('Home Page', () => {
  it('Shows Loading on first load', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitForElementToBeRemoved(await screen.findByTestId('loading'));
  });

  it('Shows carousel of genres after loading', async () => {
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.queryByText('Action')).toBeDefined();
    expect(screen.queryByText('Adventure')).toBeDefined();
    expect(screen.queryByText('Comedy')).toBeDefined();
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
describe('Home Page with Error', () => {
  console.error = jest.fn(); // Suppress error messages
  test('Shows Loading on first load', async () => {
    server.use(...errorHandler);
    const screen = render(
      <QueryClientProvider client={errorQueryClient}>
        <Home />
      </QueryClientProvider>,
    );
    await waitForElementToBeRemoved(await screen.findByTestId('loading'));
  });

  test('Shows Movie data after loading', async () => {
    server.use(...errorHandler);
    const screen = render(
      <QueryClientProvider client={errorQueryClient}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.queryByText('Something went wrong:')).toBeTruthy();
  });
});
