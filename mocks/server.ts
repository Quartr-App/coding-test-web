import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const FETCH_ERROR_MESSAGE = "Failed to fetch"

export const server = setupServer(...handlers);
