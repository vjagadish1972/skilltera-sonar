import { apiInstance } from "./apiHandler";
import ApiConstants from "../apiconstants";

/* Client Login API */
export const getAllSkills = (params) =>
    apiInstance
        .get(ApiConstants.GET_All_SKILLS, {
            params: params,
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
