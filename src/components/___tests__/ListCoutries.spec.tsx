import { fireEvent, render, screen, within} from '@testing-library/react'
import '@testing-library/jest-dom'

import { ListCountries } from '../ListCountries'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { alphabeticalOrderData } from '../../utils/alphabeticalOrder'

describe('Shoul render component List Coutries', () => {
    it('Should render List coutries options', () => {
        //do
        const {asFragment} = render(
            <Provider store={store}>
                <ListCountries />
            </Provider>
        )

        // then
        expect(screen.getAllByText('Country')[0]).toBeInTheDocument()
        expect(screen.getAllByText('Country')[1]).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot();
    })

    it('Should render change value input', () => {
        // do
        render(
            <Provider store={store}>
                <ListCountries />
            </Provider>
        )

        // then
        const input = screen.getByTestId('test-country')
        const dataInput: HTMLInputElement = within(input).getByRole('combobox')
        fireEvent.change(dataInput, { target: { value: 'Brazil' } })        
        expect(dataInput.value).toBe('Brazil')

    })

    const mockDataTest: any = [{
        name: { common: 'Test common A' },
        flag: 'test flag'
    }, {
        name: { common: 'Test common B' },
        flag: 'test flag'
    }]

    const mockFn = jest.fn(data => data)

    it('Should render alphabetical order', () => {
        // do
        mockFn(alphabeticalOrderData(mockDataTest))

        // then
        expect(mockFn).toHaveReturned()
    })
})