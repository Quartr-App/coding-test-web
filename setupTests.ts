import "cross-fetch/polyfill";

import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


vi.mock(import('./utils/logging'), () => ({
  logger: () =>  {},
}))
