import { createSlice } from "@reduxjs/toolkit";

const JobDataByIdReducer = createSlice({
    name: 'jobDataByIdReducer',
    initialState: {
        itemData: ''
    },
    reducers: {
        selectJobDataByIdelection(state, action) {
            if (action.payload.length == 0) {
                state.itemData = action.payload
            } else {
                state.itemData = Object.assign({}, action.payload)
            }

        }
    }
})

export default JobDataByIdReducer.reducer;
export const { selectJobDataByIdelection } = JobDataByIdReducer.actions