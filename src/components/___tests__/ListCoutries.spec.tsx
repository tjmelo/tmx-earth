import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import { ListCountries } from '../ListCountries'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { alphabeticalOrderData } from '../../utils/alphabeticalOrder'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


describe('Shoul render component List Coutries', () => {
    it('Should render List coutries options', () => {
        //do
        const {asFragment} = render(
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <ListCountries />
                </Provider>
            </QueryClientProvider>
        )

        // then
        expect(screen.getByText('Waiting for list countries')).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot();
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
        // do
        mockFn(alphabeticalOrderData(mockDataTest as []))

        // then
        expect(mockFn).toHaveReturned()
    })
})