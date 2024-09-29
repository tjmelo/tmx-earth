import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import InfoCountries from '../Countries'
import { Provider } from "react-redux";
import store from "../../store/store";
import { update } from '../../feature/country/countrySlice';

describe('Should render the information of coutries', () => {
    // do
    it('Should render without a default value', async () => {
        const {asFragment} = render(
            <Provider store={store}>
                <InfoCountries />
            </Provider>
                
        )
    
        //then    
        await screen.findByText('Type the name of a country!')
        expect(asFragment()).toMatchSnapshot();
    })

    it('Should render with a default value', async () => {
        // do
        store.dispatch(update('Brazil'))

        // then
        render(
            <Provider store={store}>
                <InfoCountries />   
            </Provider>
        )
    })
    
})
