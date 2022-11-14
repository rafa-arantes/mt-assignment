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

beforeAll(() => {
  server.listen();
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
