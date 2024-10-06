import { createSlice } from "@reduxjs/toolkit";

const SidebarMenuSelectionSlice = createSlice({
    name: 'sidebarMenuSelection',
    initialState: {
        menuSelection: 'allCandidate',
    },
    reducers: {
        selectSidebarMenuSelection(state, action) {
            state.menuSelection = action.payload
        }
    }
})

export default SidebarMenuSelectionSlice.reducer;
export const { selectSidebarMenuSelection } = SidebarMenuSelectionSlice.actions 