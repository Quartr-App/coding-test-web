import { it, expect, describe } from "vitest"
import { render } from '@testing-library/react'
import { TrendingCompanies } from './TrendingList'
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'

describe('Matches snapshot', () => {
  it('Default', () => {
    const { container } = render(<TrendingCompanies />)

    expect(container).toMatchSnapshot()
  })

  it('Loading', () => {
    server.use(
      http.get('/api/companies', async () => {
        delay(1000)

        return HttpResponse.error();
      })
    );

    const { container } = render(<TrendingCompanies />)

    expect(container).toMatchSnapshot()
  })

  it('Error', () => {
    server.use(
      http.get('/api/companies', () => {
        return HttpResponse.error();
      })
    );

    const { container } = render(<TrendingCompanies />)

    expect(container).toMatchSnapshot()
  })
})
