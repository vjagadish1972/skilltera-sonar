import { apiInstance } from "./apiHandler";
import ApiConstants from "../apiconstants";

/* Client Login API */
export const postLogin = (data) =>
    apiInstance
        .post(ApiConstants.COMPANY_LOGIN, data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

/* Client Jobs API */
export const getClientJobs = () =>
    apiInstance
        .get(ApiConstants.CLIENT_JOB_LIST)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

/* Client candidate list by job id */
export const getCandidateListByJobId = (jobId, data) =>
    apiInstance
        .post(ApiConstants.CLIENT_CANDIDATE_LIST + jobId, data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
/* Client candidate list by job id and category */
export const getCandidateSelection = (status, jobId) =>
    apiInstance
        .get(
            ApiConstants.CLIENT_CANDIDATE_SELECTION + status + "/" + jobId
        )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
/* Client candidate list by job id */
export const postCandidateSelection = (data) =>
    apiInstance
        .post(ApiConstants.CLIENT_CANDIDATE_SELECTION, data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
/* Client candidate delete by selection id */
export const deleteCandidateSelection = (data) =>
    apiInstance
        .delete(ApiConstants.CLIENT_CANDIDATE_DELETE + data)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });