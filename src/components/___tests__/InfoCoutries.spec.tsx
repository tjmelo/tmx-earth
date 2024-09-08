import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import InfoCountries from '../Countries'
import { Provider } from "react-redux";
import store from "../../store/store";

test('Should render the information of coutries', async () => {
    //do
    const {asFragment} = render(
        <Provider store={store}>
            <InfoCountries />
        </Provider>
    )

    //then    
    expect(screen.getByText('Type the name of a country!')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot();
})
