import "cross-fetch/polyfill";

import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Supress output spamming
vi.mock(import('./utils/logging'), () => ({
  logger: () => { },
}))

// Requires mocking
vi.mock('@next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'Inter',
    },
  }),
}))

// Mocks random values
// This creates consistent classnames for styled components
vi.mock('./utils/maths', () => ({
  randomInt: () => 4 // or some fixed value
}))
