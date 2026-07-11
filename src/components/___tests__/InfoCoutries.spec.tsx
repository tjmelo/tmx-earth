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
})
