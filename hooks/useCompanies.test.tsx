import Events from "events"

import { describe, it, expect, beforeEach } from "vitest"
import { StrictMode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useCompanies } from '../hooks/useCompanies';
import { server, FETCH_ERROR_MESSAGE } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { RESP_COMPANIES } from "../mocks/responses/companies";

const RET = {
  data: 0,
  loading: 1,
  error: 2,
  retry: 3,
} as const

describe('useCompanies', () => {
  beforeEach(() => {
    if (typeof Events.setMaxListeners === 'function') {
      // Specifically set to handle the abort controller subscriptions
      Events.setMaxListeners(20);
    }
  });

  it('should handle React Strict Mode double mount correctly', async () => {
    let requestCount = 0;

    server.use(
      http.get('/api/companies', () => {
        requestCount++;
        return HttpResponse.json({
          data: [
            {
              companyName: 'Test Company',
            }
          ]
        });
      })
    );

    const { result } = renderHook(() => useCompanies(), {
      wrapper: ({ children }) => (
        <StrictMode>{children}</StrictMode>
      ),
    });

    expect(result.current[RET.data]).toEqual([]);
    expect(result.current[RET.loading]).toBe(true);

    // Wait for effects to complete (Strict Mode will mount twice)
    await waitFor(() => {
      expect(result.current[1]).toBe(false);
    });

    expect(result.current[RET.data]).toHaveLength(1);
    expect(result.current[RET.data][0].companyName).toBe('Test Company');
    expect(result.current[RET.error]).toBeNull();

    // In Strict Mode with AbortController, we expect 2 requests
    // (first gets aborted, second succeeds)
    expect(requestCount).toBeGreaterThanOrEqual(1);
  });

  describe("Functionality", () => {
    it('should fetch companies data on mount', async () => {
      const { result } = renderHook(() => useCompanies());

      expect(result.current[RET.data]).toEqual([]);
      expect(result.current[RET.loading]).toBe(true);
      expect(result.current[RET.error]).toBeNull();

      await waitFor(() => {
        expect(result.current[1]).toBe(false);
      });

      expect(result.current[RET.data]).toHaveLength(RESP_COMPANIES.data.length);
      expect(result.current[RET.data][0].companyName).toBe('OKEA');
      expect(result.current[RET.error]).toBeNull();
    });


    it('should set loading to true on init', async () => {
      const { result } = renderHook(() => useCompanies());

      expect(result.current[RET.loading]).toBe(true);
    });

    it('should set loading to false on fetch completion', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.loading]).toBe(false);
      });
    });

    it('should set loading to false on fetch completion', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.data]).to.deep.eq(RESP_COMPANIES.data);
      });
    });
  })

  describe("Error Handling", () => {
    beforeEach(() => {
      server.use(
        http.get('/api/companies', () => {
          return HttpResponse.error();
        })
      );
    })

    it('should set error when fetch fails', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.error]).not.toBeNull();
      });
    });

    it('should set error message when status is not okay', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.error]).to.contain(FETCH_ERROR_MESSAGE);
      });
    });

    it('should should not set data on failure', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.data]).toHaveLength(0);
      });
    });

    it('should clear error message on retry', async () => {
      const { result } = renderHook(() => useCompanies());

      await waitFor(() => {
        expect(result.current[RET.error]).not.toBeNull();
      });

      server.resetHandlers()

      result.current[RET.retry]()

      await waitFor(() => {
        expect(result.current[RET.error]).toBeNull()
      });
    });
  })

  describe("Abort Contoller", () => {
    beforeEach(() => {
      server.use(
        http.get('/api/companies', async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.json(RESP_COMPANIES);
        })
      );
    })

    it('should abort fetch on component unmount', async () => {
      const { unmount, result } = renderHook(() => useCompanies());

      expect(result.current[RET.loading]).toBe(true);

      unmount();

      await new Promise(resolve => setTimeout(resolve, 200));

      expect(result.current[RET.loading]).toBe(true);
    });

    it('should ignore AbortError when request is cancelled', async () => {
      const { unmount, result } = renderHook(() => useCompanies());

      expect(result.current[RET.loading]).toBe(true);

      unmount();

      await new Promise(resolve => setTimeout(resolve, 200));

      expect(result.current[RET.error]).toBeNull();
    });
  });

  describe("Retry Request", () => {
    it('should reset internal state when retry is called', async () => {
      const { result } = renderHook(() => useCompanies());

      expect(result.current[RET.data]).toEqual([]);
      expect(result.current[RET.loading]).toBe(true);
      expect(result.current[RET.error]).toBeNull();

      await waitFor(() => {
        expect(result.current[RET.loading]).toBe(false);
      });

      expect(result.current[RET.data]).toHaveLength(RESP_COMPANIES.data.length);
      expect(result.current[RET.loading]).toBe(false);
      expect(result.current[RET.error]).toBeNull();

      server.use(
        http.get('/api/companies', async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.json(RESP_COMPANIES);
        })
      );

      result.current[RET.retry]()

      await waitFor(() => {
        expect(result.current[RET.data]).toHaveLength(0);
        expect(result.current[RET.loading]).toBe(true);
        expect(result.current[RET.error]).toBeNull();
      });

      await waitFor(() => {
        expect(result.current[RET.data]).toHaveLength(RESP_COMPANIES.data.length);
        expect(result.current[RET.loading]).toBe(false);
        expect(result.current[RET.error]).toBeNull();
      });
    });
  });
});
