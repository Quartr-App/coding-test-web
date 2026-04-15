import { delay, http, HttpResponse } from 'msw';
import { RESP_COMPANIES } from './responses/companies';

export const handlers = [
  http.get('/api/companies', async ({ request }) => {
    const url = new URL(request.url)
    const slowMode = url.searchParams.get('slow')

    if (slowMode) {
      await delay(parseInt(slowMode, 10))
    }

    return HttpResponse.json(RESP_COMPANIES);
  }),
];
