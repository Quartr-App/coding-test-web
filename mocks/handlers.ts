import { delay, http, HttpResponse } from 'msw';
import { RESP_COMPANIES } from './responses/companies';

export const handlers = [
  http.get('/api/companies', async ({ request }) => {
    if (process.env.NODE_ENV !== "test") {
      await delay(1000)

      if (Math.random() > 0.75) {
        return HttpResponse.error()
      }
    }

    return HttpResponse.json(RESP_COMPANIES);
  }),
];
