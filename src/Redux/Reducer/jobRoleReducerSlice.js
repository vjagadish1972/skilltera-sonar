import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";


export const GetAllJobList = createAsyncThunk("fetchJobRole", async () => {

    let roleList = null;
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

    } else if (sessionStorage.getItem("opsDashboard")) {
        const opsToken = JSON.parse(sessionStorage.getItem("ops_token"))
        token = opsToken
    } else if (sessionStorage.getItem("adminDashboard")) {
        const adminToken = JSON.parse(sessionStorage.getItem("ADMIN"))
        token = adminToken.token
    }

    const response = await axios.get(ApiConstants.GET_All_JOB_ROLES,
        {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                token: token,
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }
        })

    // roleList = response.data.roles.sort((a, b) => a.role.localeCompare(b.role, undefined, { sensitivity: 'base' }));
    roleList = response.data.roles.sort((a, b) => (a.role && b.role) ? a.role.localeCompare(b.role) : 0)
    return roleList


});


const JobRoleReducerSlice = createSlice({
    name: 'jobRole',
    initialState: {
        jobRoleList: {
            isLoading: false,
            data: [],
            isError: false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(GetAllJobList.pending, (state) => {
            state.jobRoleList.isLoading = true
        })
        builder.addCase(GetAllJobList.fulfilled, (state, action) => {
            state.jobRoleList.isLoading = false
            state.jobRoleList.data = action.payload
        })
        builder.addCase(GetAllJobList.rejected, (state, action) => {
            state.jobRoleList.isLoading = false
            state.jobRoleList.isError = true
        })
    }
})

export default JobRoleReducerSlice.reducer