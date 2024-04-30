import { createSlice } from '@reduxjs/toolkit';

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

export const { update } = countrySlice.actions;
export default countrySlice.reducer;