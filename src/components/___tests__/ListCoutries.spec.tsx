import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ListCountries } from '../ListCountries'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { alphabeticalOrderData } from '../../utils/alphabeticalOrder'
import { QueryClient, QueryClientProvider } from 'react-query'
import { toRequestAll } from '../../service/request'
import { update } from '../../feature/country/countrySlice'

jest.mock('../../service/request', () => ({
    toRequestAll: jest.fn(),
}))

const mockedToRequestAll = toRequestAll as jest.MockedFunction<typeof toRequestAll>

const renderComponent = () => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

    return render(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ListCountries />
            </Provider>
        </QueryClientProvider>
    )
}

describe('Shoul render component List Coutries', () => {
    beforeEach(() => {
        store.dispatch(update(''))
        mockedToRequestAll.mockReset()
    })

    it('Should render the loading state while the list request is pending', () => {
        mockedToRequestAll.mockReturnValue(new Promise(() => undefined))

        const { asFragment } = renderComponent()

        expect(screen.getByText('Waiting for list countries')).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot();
    })

    it('Should render the browse options and dispatch the selected country when a user picks an option', async () => {
        mockedToRequestAll.mockResolvedValue({
            data: [
                { name: { common: 'Brazil' }, cca3: 'BRA', flags: { svg: 'flag' } },
                { name: { common: 'Canada' }, cca3: 'CAN', flags: { svg: 'flag' } },
            ],
            status: 200,
        } as never)

        renderComponent()

        const select = await waitFor(() => screen.getByLabelText('select-country'))
        expect(select).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Brazil' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument()

        fireEvent.change(select, { target: { value: 'Brazil' } })

        expect(store.getState().country.country).toBe('Brazil')
    })

    it('Should render countries from a direct array response without breaking the dropdown flow', async () => {
        mockedToRequestAll.mockResolvedValue([
            { name: { common: 'Argentina' }, cca3: 'ARG', flags: { svg: 'flag' } },
            { name: { common: 'Chile' }, cca3: 'CHL', flags: { svg: 'flag' } },
        ] as never)

        renderComponent()

        const select = await waitFor(() => screen.getByLabelText('select-country'))
        expect(select).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Argentina' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Chile' })).toBeInTheDocument()
    })

    const mockDataTest = [{
        name: { common: 'Test common A' },
        flag: 'test flag'
    }, {
        name: { common: 'Test common B' },
        flag: 'test flag'
    }]

    it('Should render alphabetical order', () => {
        const result = alphabeticalOrderData(mockDataTest as [])

        expect(result.map((item: { name: { common: string } }) => item.name.common)).toEqual(['Test common A', 'Test common B'])
    })
})