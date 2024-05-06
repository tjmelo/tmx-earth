import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import InfoCountries from '../Countries'
import { Provider } from "react-redux";
import store from "../../store/store";

test('Should render the information of coutries', async () => {
    //do
    const {asFragment, getByText } = render(
        <Provider store={store}>
            <InfoCountries />
        </Provider>
    )

    //then    
    expect(getByText('Select a country!')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot();
})