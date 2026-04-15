import { http, HttpResponse } from 'msw';
import { RESP_COMPANIES } from './responses/companies';

export const handlers = [
  http.get('/api/companies', () => {
    return HttpResponse.json(RESP_COMPANIES);
  }),
];

