import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CompanyCellList } from './company-cell-list'
import apiClient from '@/libs/api-client'
import { Company } from '@/companies/types'
import { SKELETON_COUNT } from '@/companies/constants'

jest.mock('@/libs/api-client')
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>

const mockCompanies: Company[] = [
  {
    companyId: 1,
    companyName: 'Test Company 1',
    companyTicker: 'TC1', description: 'Test description 1',
    companyCountry: 'NO',
    displayName: 'Test Company 1',
    infoUrl: '',
    liveUrl: '',
    logoLightUrl: '',
    logoDarkUrl: '',
    iconUrl: '',
    reportingCurrency: '',
    colorSettings: undefined,
    events: [],
    isins: []
  },
  {
    companyId: 2,
    companyName: 'Test Company 2',
    companyTicker: 'TC2', description: 'Test description 2',
    companyCountry: 'NO',
    displayName: 'Test Company 2',
    infoUrl: '',
    liveUrl: '',
    logoLightUrl: '',
    logoDarkUrl: '',
    iconUrl: '',
    reportingCurrency: '',
    colorSettings: undefined,
    events: [],
    isins: []
  },
]

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('CompanyCellList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading skeletons while fetching data', () => {
    mockedApiClient.get.mockResolvedValueOnce(mockCompanies)
    render(<CompanyCellList />, { wrapper: createWrapper() })
    expect(screen.getAllByTestId('company-cell-skeleton')).toHaveLength(SKELETON_COUNT)
  })

  it('renders company cells after successful data fetch', async () => {
    mockedApiClient.get.mockResolvedValueOnce(mockCompanies)
    render(<CompanyCellList />, { wrapper: createWrapper() })
    await waitFor(() => {
      expect(screen.getByText('Test Company 1')).toBeTruthy()
      expect(screen.getByText('Test Company 2')).toBeTruthy()
    })
  })

  it('renders empty state when no companies are returned', async () => {
    mockedApiClient.get.mockResolvedValueOnce([])
    render(<CompanyCellList />, { wrapper: createWrapper() })
    
    await waitFor(() => {
      expect(screen.queryByTestId('company-cell')).not.toBeTruthy()
    })
  })
})