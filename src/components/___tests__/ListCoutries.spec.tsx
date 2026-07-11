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

    it('Should render List coutries options', () => {
        mockedToRequestAll.mockReturnValue(new Promise(() => undefined))

        const { asFragment } = renderComponent()

        expect(screen.getByText('Waiting for list countries')).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot();
    })

    it('Should dispatch the selected country when a user picks an option', async () => {
        mockedToRequestAll.mockResolvedValue({
            data: [{ name: { common: 'Brazil' }, flags: { svg: 'flag' } }],
            status: 200,
        } as never)

        renderComponent()

        await waitFor(() => expect(screen.getByLabelText('select-country')).toBeInTheDocument())
        fireEvent.change(screen.getByLabelText('select-country'), { target: { value: 'Brazil' } })

        expect(store.getState().country.country).toBe('Brazil')
    })

    const mockDataTest = [{
        name: { common: 'Test common A' },
        flag: 'test flag'
    }, {
        name: { common: 'Test common B' },
        flag: 'test flag'
    }]

    const mockFn = jest.fn(data => data)

    it('Should render alphabetical order', () => {
        mockFn(alphabeticalOrderData(mockDataTest as []))

        expect(mockFn).toHaveReturned()
    })
})