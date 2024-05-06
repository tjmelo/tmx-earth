import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

import Loading from '../Load'

test('Should render a load message', () => {
    //do
    const childrenTest = 'TMX Earth'
    const {asFragment, getByText} = render(<Loading type={'info'} children={childrenTest} />)

    // then
    expect(getByText(childrenTest)).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot();
})