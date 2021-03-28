// Require createSlice for redux toolkit to reducer...
import { createSlice } from '@reduxjs/toolkit';

// Create variable to method createSlice...
const countrySlice = createSlice({
    name: 'country',
    initialState: {
        country: [],
    },
    reducers: {
        update: (state, action) => {
            state.country = action.payload;
        }
    }
})

// Export action update to reducer...
export const { update } = countrySlice.actions;

// Export default reducer...
export default countrySlice.reducer;