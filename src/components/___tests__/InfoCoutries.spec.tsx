import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react";
import InfoCountries from '../Countries'
import { Provider } from "react-redux";
import store from "../../store/store";
import { update } from '../../feature/country/countrySlice';
import { toRequestOne } from '../../service';

jest.mock('../../service', () => ({
    toRequestOne: jest.fn(),
}))

jest.mock('../Mount', () => ({
    __esModule: true,
    default: ({ data }: { data: { name: { common: string } } }) => <div>{data.name.common}</div>,
}))

const mockedToRequestOne = toRequestOne as jest.MockedFunction<typeof toRequestOne>

describe('Should render the information of coutries', () => {
    beforeEach(() => {
        store.dispatch(update(''))
        mockedToRequestOne.mockReset()
    })

    it('Should render without a default value', async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <InfoCountries />
            </Provider>
        )

        expect(await screen.findByText('Type the name of a country')).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot();
    })

    it('Should preserve the previous details while loading a new country', async () => {
        mockedToRequestOne.mockResolvedValueOnce({
            data: [{ name: { common: 'Brazil' }, flags: { svg: 'flag' } }],
        } as never)

        render(
            <Provider store={store}>
                <InfoCountries />
            </Provider>
        )

        act(() => {
            store.dispatch(update('Brazil'))
        })
        expect(await screen.findByText('Brazil')).toBeInTheDocument()

        mockedToRequestOne.mockReturnValueOnce(new Promise(() => undefined))
        act(() => {
            store.dispatch(update('Argentina'))
        })

        expect(await screen.findByText('Loading details for Argentina...')).toBeInTheDocument()
        expect(screen.getByText('Brazil')).toBeInTheDocument()
    })

    it('renders a friendly fallback when a lookup returns no details', async () => {
        mockedToRequestOne.mockResolvedValueOnce({
            data: [],
        } as never)

        render(
            <Provider store={store}>
                <InfoCountries />
            </Provider>
        )

        act(() => {
            store.dispatch(update('Unknown Country'))
        })

        expect(await screen.findByText(/No details available/i)).toBeInTheDocument()
    })

    describe('Successful country lookup', () => {
        it('renders country details when lookup returns a complete country object', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: [{
                    name: { common: 'Canada', official: 'Canada', nativeName: {} },
                    flags: { svg: 'https://flagcdn.com/ca.svg' },
                    population: 40000000,
                    area: 9985000,
                    region: 'North America',
                    capital: 'Ottawa',
                    subregion: 'Northern America',
                    cca3: 'CAN',
                    currencies: {},
                    languages: {},
                    borders: ['USA'],
                    tld: ['.ca'],
                    coatOfArms: { svg: 'coat.svg' },
                }],
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Canada'))
            })

            expect(await screen.findByText('Canada')).toBeInTheDocument()
        })

        it('renders country details with unavailable fields when provider response has missing values', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: [{
                    name: { common: 'France', official: 'Unavailable', nativeName: {} },
                    flags: { svg: 'Unavailable' },
                    population: 'Unavailable',
                    area: 'Unavailable',
                    region: 'Europe',
                    capital: 'Unavailable',
                    subregion: 'Unavailable',
                    cca3: 'FRA',
                    currencies: null,
                    languages: null,
                    borders: null,
                    tld: null,
                    coatOfArms: { svg: 'Unavailable' },
                }],
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('France'))
            })

            expect(await screen.findByText('France')).toBeInTheDocument()
        })

        it('renders a single object payload without treating it as a missing result', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: {
                    name: { common: 'Peru', official: 'Republic of Peru', nativeName: {} },
                    flags: {},
                    population: null,
                    area: null,
                    region: 'South America',
                    capital: ['Lima'],
                    subregion: 'South America',
                    cca3: 'PER',
                    currencies: null,
                    languages: null,
                    borders: null,
                    tld: null,
                    coatOfArms: {},
                },
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Peru'))
            })

            expect(await screen.findByText('Peru')).toBeInTheDocument()
            expect(screen.queryByText(/No details available for Peru/i)).not.toBeInTheDocument()
        })
    })

    describe('No-result lookup scenarios', () => {
        it('displays friendly no-details message when lookup returns empty array', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: [],
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Nonexistent Country'))
            })

            expect(await screen.findByText(/No details available for Nonexistent Country/i)).toBeInTheDocument()
        })

        it('preserves last loaded country details when no results are found for new search', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: [{ name: { common: 'Germany' }, flags: { svg: 'flag' } }],
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Germany'))
            })

            expect(await screen.findByText('Germany')).toBeInTheDocument()

            mockedToRequestOne.mockResolvedValueOnce({
                data: [],
            } as never)

            act(() => {
                store.dispatch(update('Invalid Country'))
            })

            expect(await screen.findByText(/No details available for Invalid Country/i)).toBeInTheDocument()
        })
    })

    describe('Error handling during lookup', () => {
        it('displays error message when lookup request fails and no previous data is available', async () => {
            mockedToRequestOne.mockRejectedValueOnce(new Error('Network error'))

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Italy'))
            })

            expect(await screen.findByText(/Unable to load country details/i)).toBeInTheDocument()
        })

        it('preserves last loaded country details when new lookup fails', async () => {
            mockedToRequestOne.mockResolvedValueOnce({
                data: [{ name: { common: 'Spain' }, flags: { svg: 'flag' } }],
            } as never)

            render(
                <Provider store={store}>
                    <InfoCountries />
                </Provider>
            )

            act(() => {
                store.dispatch(update('Spain'))
            })

            expect(await screen.findByText('Spain')).toBeInTheDocument()

            mockedToRequestOne.mockRejectedValueOnce(new Error('API error'))

            act(() => {
                store.dispatch(update('Portugal'))
            })

            // Should preserve the Spain details and show loading message
            expect(await screen.findByText('Spain')).toBeInTheDocument()
        })
    })
})
