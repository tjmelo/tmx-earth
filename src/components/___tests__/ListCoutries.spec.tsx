import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'

import { ListCountries } from '../ListCountries'
import { Provider } from 'react-redux'
import store from '../../store/store'

test('Should render List coutries options', () => {
    //do
    const {asFragment, getByText} = render(
        <Provider store={store}>
            <ListCountries />
        </Provider>
    )

    // then
    expect(getByText('Select a country')).toBeInTheDocument()
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
    const input: HTMLSelectElement = screen.getByLabelText('select-country')

    fireEvent.change(input.options[0], {target: {value: optionSelectTest}})
    expect(input.value).toBe(optionSelectTest)

})
