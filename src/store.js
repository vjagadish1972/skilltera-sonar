import { configureStore } from "@reduxjs/toolkit";
import homeItemSelectionSlice from './Redux/Reducer/homeItemSelectionSlice';
import sidebarMenuSelectionSlice from './Redux/Reducer/sidebarMenuSelectionSlice';
import searchBarSlice from './Redux/Reducer/searchBarSlice';
import skillReducerSlice from './Redux/Reducer/skillReducerSlice';
import jobRoleReducerSlice from './Redux/Reducer/jobRoleReducerSlice';
import skillSideFilterDataCompanySlice from './Redux/Reducer/skillSideFilterDataCompanySlice';
import cardItemSelectionSlice from './Redux/Reducer/cardItemSelectionSlice';
import companyListReducerSlice from './Redux/Reducer/companyListReducerSlice';
import filterDataJobReducerSlice from './Redux/Reducer/filterDataJobReducerSlice';
import jobDataByIdReducer from "./Redux/Reducer/jobDataByIdReducer";
import jobNameSelectionSlice from "./Redux/Reducer/jobNameSelectionSlice";


const store = configureStore({
    reducer: {
        homeItemSelection: homeItemSelectionSlice,
        sidebarMenuSelectionReducer: sidebarMenuSelectionSlice,
        searchBar: searchBarSlice,
        skills: skillReducerSlice,
        jobRole: jobRoleReducerSlice,
        skillSideFilterDataCompany: skillSideFilterDataCompanySlice,
        cardItemSelection: cardItemSelectionSlice,
        companyList: companyListReducerSlice,
        filterDataJob: filterDataJobReducerSlice,
        jobDataById: jobDataByIdReducer,
        jobNameSelection: jobNameSelectionSlice,
    }
})

export default store;