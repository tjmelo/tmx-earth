import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../feature/country/countrySlice';

export default configureStore({
    reducer: {
        country: countryReducer,
    }
})