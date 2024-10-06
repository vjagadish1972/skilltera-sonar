import { createSlice } from "@reduxjs/toolkit";

const CardItemSelectionSlice = createSlice({
    name: 'cardItemSelectionSlice',
    initialState: {
        itemSelectId: ''
    },
    reducers: {
        selectCardItemSelection(state, action) {
            state.itemSelectId = action.payload
        }
    }
})

export default CardItemSelectionSlice.reducer;
export const { selectCardItemSelection } = CardItemSelectionSlice.actions