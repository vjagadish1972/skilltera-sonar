import { createSlice } from "@reduxjs/toolkit";

const JobNameSelectionSlice = createSlice({
    name: 'jobNameSelectionSlice',
    initialState: {
        jobName: ''
    },
    reducers: {
        selectJobNameSelection(state, action) {
            state.jobName = action.payload
        }
    }
})

export default JobNameSelectionSlice.reducer;
export const { selectJobNameSelection } = JobNameSelectionSlice.actions