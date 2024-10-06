import { createSlice } from "@reduxjs/toolkit";

const SkillSideFilterDataCompanySlice = createSlice({
    name: 'skillSideFilterDataCompany',
    initialState: {
        skill: '',
        minExp: null,
        maxExp: null,
    },
    reducers: {
        changeSkillSideFilterDataCompany(state, action) {
            state.skill = action.payload[0]
            state.minExp = action.payload[1]
            state.maxExp = action.payload[2]
        }
    }
})

export default SkillSideFilterDataCompanySlice.reducer;
export const { changeSkillSideFilterDataCompany } = SkillSideFilterDataCompanySlice.actions