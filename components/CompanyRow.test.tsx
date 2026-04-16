import { it, expect } from "vitest"
import { render } from '@testing-library/react'
import { CompanyRows } from './CompanyRow'
import { RESP_COMPANIES } from '../mocks/responses/companies'

it('Matches snapshot', () => {
  const screen = render(<CompanyRows companies={RESP_COMPANIES.data} />)

  expect(screen).toMatchSnapshot()
})
