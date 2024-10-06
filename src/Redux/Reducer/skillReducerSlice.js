import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";



export const GetAllSkills = createAsyncThunk("fetchSkill", async () => {

    let skillList = null;
    let token;

    if (sessionStorage.getItem("candidateDashboard")) {
        const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"))
        token = candidateData.token
    } else if (sessionStorage.getItem("companyDashboard")) {
        const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"))
        token = company_loggedin_user_data.token

    } else if (sessionStorage.getItem("candidateDashboardRef")) {
        const refered_loggedin_user_data = JSON.parse(sessionStorage.getItem("candidate_data_ref"))
        token = refered_loggedin_user_data.token

    } else if (sessionStorage.getItem("adminDashboard")) {
        const adminToken = JSON.parse(sessionStorage.getItem("ADMIN"))
        token = adminToken.token
    }

    const response = await axios.get(ApiConstants.GET_All_SKILLS,
        {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                token: token,
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }
        })

    skillList = response.data.skills.sort((a, b) => a.skill.localeCompare(b.skill));
    return skillList


});


const SkillReducerSlice = createSlice({
    name: 'skill',
    initialState: {
        skillList: {
            isLoading: false,
            data: [],
            isError: false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(GetAllSkills.pending, (state) => {
            state.skillList.isLoading = true
        })
        builder.addCase(GetAllSkills.fulfilled, (state, action) => {
            state.skillList.isLoading = false
            state.skillList.data = action.payload
        })
        builder.addCase(GetAllSkills.rejected, (state) => {
            state.skillList.isError = true
        })
    }
})

export default SkillReducerSlice.reducer