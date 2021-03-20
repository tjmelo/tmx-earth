// Require configureStore from redux toolkit...
import { configureStore } from '@reduxjs/toolkit';

// Require createSlice from countryReducer...
import countryReducer from '../feature/county/countrySlice';

// Export method configureStore with object reducer...
export default configureStore({
    reducer: {
        country: countryReducer,
    }
})