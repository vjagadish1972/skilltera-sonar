import { createSlice } from "@reduxjs/toolkit";

const SearchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        initialValue: ''
    },
    reducers: {
        inputSearchBar(state, action) {
            state.initialValue = action.payload
        }
    }
})

export default SearchBarSlice.reducer;
export const { inputSearchBar } = SearchBarSlice.actions