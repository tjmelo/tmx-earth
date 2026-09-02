import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
    country: string
}

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        country: 'Angola',
    } as CountryState,
    reducers: {
        update: (state, action: PayloadAction<string>) => {
            state.country = action.payload || '';
        }
    }
})

export const { update } = countrySlice.actions;
export default countrySlice.reducer;