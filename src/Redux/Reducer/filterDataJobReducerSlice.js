import { createSlice } from "@reduxjs/toolkit";

const FilterDataJobReducerSlice = createSlice({
    name: 'filterDataJobReducer',
    initialState: {
        filteredJobData: ''
    },
    reducers: {
        selectFilterDataJob(state, action) {
            state.filteredJobData = action.payload
        }
    }
})

export default FilterDataJobReducerSlice.reducer;
export const { selectFilterDataJob } = FilterDataJobReducerSlice.actions