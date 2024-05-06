import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

import MountListCountries from '../Mount'

const dataTest = {
    flags: {
        svg: 'SVG data test'
    },
    name: {
        official: 'Official name test',
        common: 'Common name test',
    },
    coatOfArms: {
        svg: 'SVG data test',
    },
    languages: [
        'language test', 
        'other language test'
    ],
    population: 101010,
    area: 999999


}

test('Should render a Mount List Country', () => {
    //do
    const {asFragment, getByText} = render(<MountListCountries data={dataTest}/>)

    // then
    expect(getByText('Common name test')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot();
})