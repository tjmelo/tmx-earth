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
    languages: {
        en: 'language test',
        fr: 'other language test'
    },
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
    expect(screen.getByRole('heading', { name: 'Test data' })).toBeInTheDocument()
    const statCards = document.querySelectorAll('.stat-card')
    expect(statCards).toHaveLength(4)

    const statLabels = Array.from(document.querySelectorAll('.stat-card small')).map((node) => node.textContent?.trim())
    expect(statLabels).toEqual(expect.arrayContaining(['POPULAÇÃO', 'ÁREA', 'CAPITAL', 'IDIOMA OFICIAL']))
    expect(asFragment()).toMatchSnapshot();
})

test('Should hide the official language card only when the API payload is missing or empty', () => {
    const { rerender } = render(
        <MountListCountries
            data={{
                ...dataTest,
                languages: { eng: { common: 'English', official: 'English' } },
            }}
        />
    )

    expect(screen.getAllByText('English')).toHaveLength(2)

    rerender(
        <MountListCountries
            data={{
                ...dataTest,
                languages: null,
            }}
        />
    )

    expect(screen.queryByText('IDIOMA OFICIAL')).not.toBeInTheDocument()
})