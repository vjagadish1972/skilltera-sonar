import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";

export const GetAllCompanyList = createAsyncThunk("fetchCompanyList", async () => {

    let companyList = null;
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
    } else {
        token = ''
    }

    const response = await axios.get(ApiConstants.ALL_COMPANY_LIST_FOR_CANDIDATE,
        {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                token: token,
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }
        })

    companyList = response.data.company.sort((a, b) => a.companyName.localeCompare(b.companyName));
    return companyList


});


const CompanyListReducerSlice = createSlice({
    name: 'companyList',
    initialState: {
        companyList: {
            isLoading: false,
            data: [],
            isError: false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(GetAllCompanyList.pending, (state) => {
            state.companyList.isLoading = true
        })
        builder.addCase(GetAllCompanyList.fulfilled, (state, action) => {
            state.companyList.isLoading = false
            state.companyList.data = action.payload
        })
        builder.addCase(GetAllCompanyList.rejected, (state) => {
            state.companyList.isError = true
        })
    }
})

export default CompanyListReducerSlice.reducer