import { createSlice } from "@reduxjs/toolkit";

const homeItemSelectionSlice = createSlice({
    name: 'homeItemSelection',
    initialState: 'candidate',
    reducers: {
        selectHomeItemSelection(state, action) {
            return state = action.payload
        }
    }
})

export default homeItemSelectionSlice.reducer;
export const { selectHomeItemSelection } = homeItemSelectionSlice.actions