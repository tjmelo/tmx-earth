import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import { ListCountries } from '../ListCountries'
import { Provider } from 'react-redux'
import store from '../../store/store'

test('Should render List coutries options', () => {
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

test('Should render another option to select', () => {
    //do
    render(
        <Provider store={store}>
            <ListCountries />
        </Provider>
    )
    
    const optionSelectTest = 'Brazil'
    const input: HTMLSelectElement = screen.getByLabelText('Country')

    fireEvent.change(input, {target: {value: optionSelectTest}})
    expect(input.value).toBe(optionSelectTest)

})
