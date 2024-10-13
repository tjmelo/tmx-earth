import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import MountListCountries from '../Mount'
import { TListData } from '../../interfaces'

const dataTest: TListData = {
    flags: {
        svg: 'SVG data test'
    },
    name: {
        official: 'Test data',
        nativeName: {
            'test': {
                common: 'Common name test'
            }
        },
        common: ''
    },
    coatOfArms: {
        svg: 'SVG data test',
    },
    languages: [
        'language test',
        'other language test'
    ],
    population: 101010,
    area: 999999,
    currencies: {},
    capital: '',
    region: '',
    subregion: '',
    borders: [],
    tld: []
}

test('Should render a Mount List Country', () => {
    //do
    const {asFragment} = render(<MountListCountries data={dataTest}/>)

    // then
    expect(screen.getByText('Common name test')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot();
})