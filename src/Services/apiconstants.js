const baseUrl = "https://skilltera-api-eta.vercel.app";

//const baseUrl = "localhost:5000"

const ApiConstants = {
    LOGIN: `${baseUrl}/api/login`,

    SIGNUP: `${baseUrl}/api/signup`,

    RESET_PASSWORD: `${baseUrl}/api/reset-password`,

    FORGET_PASSWORD: `${baseUrl}/api/forgetPassword`,

    // VERIFY_OTP: `${baseUrl}/api/verifyOtp`,  //not in use

    CONTACT_MAIL: `${baseUrl}/api/contact`,

    COMPANY_LOGIN: `${baseUrl}/api/company/login`,

    //CANDIDATE_DATA: `${baseUrl}/api/candidates/viewAll`, //not in use

    COMPANY_DATA: `${baseUrl}/api/company/viewAll`,

    ADMIN_LOGIN: `${baseUrl}/api/admin/login`,

    ADMIN_COMPANY_SIGNUP: `${baseUrl}/api/admin/company/signup`,

    ADMIN_CANDIDATE_SIGNUP: `${baseUrl}/api/admin/candidate/signup`,

    CANDIDATE_DATA_BY_ID: `${baseUrl}/api/candidate`,

    CANDIDATE_DATA_BY_TOKEN: `${baseUrl}/api/candidate`,

    CANDIDATE_DATA_BY_ID_For_COMPANY: `${baseUrl}/api/company/candidate`,

    //ADMIN_CANDIDATE_UPDATE: `${baseUrl}/api/admin/candidate/update`, //not in use

    PROFILE: `${baseUrl}/api/profile`,

    ADMIN_COMPANY_PASSWORD_RESET: `${baseUrl}/api/admin/company/reset`,

    ADMIN_CANDIDATE_DATA: `${baseUrl}/api/admin/candidates/viewAll`,

    SHORTLISTED_CANDIDATE: `${baseUrl}/api/company/addShortlisted`,

    REJECTED_CANDIDATE: `${baseUrl}/api/company/addRejected`,

    INTERVIEWING_CANDIDATE: `${baseUrl}/api/company/addInterviewed`,

    FUTURE_CANDIDATE: `${baseUrl}/api/company/addSaved`,

    //CANDIDATE_SHORTLISTED_DATA_BY_COMPANY: `${baseUrl}/api/candidates/shortlisted`, //not in use

    //CANDIDATE_REJECTED_DATA_BY_COMPANY: `${baseUrl}/api/candidates/rejected`, //not in use

    //CANDIDATE_INTERVIEWED_DATA_BY_COMPANY: `${baseUrl}/api/candidates/interviewed`, //not in use

    //CANDIDATE_SELECTED_DATA_BY_COMPANY: `${baseUrl}/api/candidates/selected`, //not in use

    //CANDIDATE_SAVED_DATA_BY_COMPANY: `${baseUrl}/api/candidates/saved`, //not in use

    GET_SHORTLISTED_CANDIDATE: `${baseUrl}/api/company/shortlisted`,

    GET_REJECTED_CANDIDATE: `${baseUrl}/api/company/rejected`,

    GET_INTERVIEWING_CANDIDATE: `${baseUrl}/api/company/interviewed`,

    GET_FUTURE_CANDIDATE: `${baseUrl}/api/company/saved`,

    //GET_ALL_COMPANY_CANDIDATE: `${baseUrl}/api/company/candidates`, //not in use

    CANDIDATE_RESUME_UPLOAD: `${baseUrl}/api/candidate/resume/upload`,

    //CANDIDATE_EXPERIECNCE: `${baseUrl}/api/profile/addExperience`, //not in use

    //CANDIDATE_SKILL: `${baseUrl}/api/profile/addSkill`, //not in use

    //Education
    ADD_EDUCATION: `${baseUrl}/api/profile/education/add`,
    UPDATE_EDUCATION: `${baseUrl}/api/profile/education/update/`,
    DELETE_EDUCATION: `${baseUrl}/api/profile/education/delete/`,
    //GET_EDUCATION: `${baseUrl}/api/profile/education`, //not in use

    //Candidate Skill
    ADD_SKILL: `${baseUrl}/api/profile/skill/add`,
    //GET_SKILL: `${baseUrl}/api/profile/skill`, //not in use
    UPDATE_SKILL: `${baseUrl}/api/profile/skill/update`,
    DELETE_SKILL: `${baseUrl}/api/profile/skill/delete/`, //:skillId will also be added

    // Certificate
    ADD_CERTIFICATE: `${baseUrl}/api/profile/certificate/add`,
    UPDATE_CERTIFICATE: `${baseUrl}/api/profile/certificate/update/`,
    DELETE_CERTIFICATE: `${baseUrl}/api/profile/certificate/delete/`,
    //GET_CERTIFICATE: `${baseUrl}/api/profile/certificate`, //not in use

    ADD_EXPERIENCE: `${baseUrl}/api/profile/experience/add`,
    UPDATE_EXPERIENCE: `${baseUrl}/api/profile/experience/update/`,
    DELETE_EXPERIENCE: `${baseUrl}/api/profile/experience/delete/`,
    //GET_EXPERIENCE: `${baseUrl}/api/profile/experience`, //not in use

    //List of all skills
    GET_All_SKILLS: `${baseUrl}/api/skillList`,

    ALL_COMPANY_LIST: `${baseUrl}/api/admin/company/list`,
    ALL_COMPANY_LIST_FOR_CANDIDATE: `${baseUrl}/api/company/viewAll`,
    GET_ALL_CANDIDATE_FILTER_DATA: `${baseUrl}/api/company/candidates/searchCandidates`,

    //Referal login
    REFERAL_LOGIN: `${baseUrl}/api/referrer/login`,

    // Referal login
    REFERAL_SIGNUP: `${baseUrl}/api/referrer/signup`,

    // create referrer
    CREATE_REFERRER: `${baseUrl}/api/referrer/create`,

    CAND_RECOMMENDATION: `${baseUrl}/api/candidate/recommendation/request`,
    //GET_ALL_RECOMMENDATION_BY_ID: `${baseUrl}/api/candidate/recommendation/`, //not in use
    GET_ALL_RECOMMENDATION: `${baseUrl}/api/candidate/recommendation/all`,

    APPROVE_RECEIVED_RECOMMENDATION : `${baseUrl}/api/candidate/recommendation/approve/`, 

    REFERAL_RESUME_UPLOAD: `${baseUrl}/api/referral/resume/upload`,

    COMPANY_PROFILE_PIC_UPLOAD: `${baseUrl}/api/company/image/upload`,

    // disapprove recommendataion

    // profile image upload
    UPLOAD_PROFILE_PIC: `${baseUrl}/api/candidate/image/upload`,

    //company image upload
    //COMPANY_UPLOAD_PROFILE_PIC: `${baseUrl}/api/company/image/upload`, //not in use

    DELETE_RECOMMENDATION: `${baseUrl}/api/candidate/recommendation/delete/`,

    RECOMMENDATION_VERIFY: `${baseUrl}/api/recommendation/verify/`,

    POST_RECOMMENDATION_VERIFY: `${baseUrl}/api/recommendation/recommend/`,

    //Job Role for Admin
    ADD_JOB_ROLES: `${baseUrl}/api/admin/role/add`,
    VIEW_ALL_JOB_ROLE: `${baseUrl}/api/admin/role/viewAll`,
    //JOB_ROLE_BY_ID: `${baseUrl}/api/admin/role/`, //not in use
    JOB_ROLE_DELETE_BY_ID: `${baseUrl}/api/admin/role/delete/`,
    JOB_ROLE_DEACTIVATE_BY_ID: `${baseUrl}/api/admin/role/deactivate/`,

    GIVEN_RECOMMENDATION: `${baseUrl}/api/candidate/recommendation/given`,

    //admin skills - add/remove
    SKILL_VIEW_ALL: `${baseUrl}/api/admin/skill/viewAll`,
    SKILL_ADD: `${baseUrl}/api/admin/skill/add`,
    SKILL_DELETE: `${baseUrl}/api/admin/skill/delete/`,
    SKILL_DEACTIVATE: `${baseUrl}/api/admin/skill/deactivate/`,

    //Job Role list
    GET_All_JOB_ROLES: `${baseUrl}/api/roleList`,

    // all jobs
    ADD_JOBS: `${baseUrl}/api/admin/job/add`,
    UPDATE_JOB: `${baseUrl}/api/admin/job/update/`,
    GET_ALL_ADDED_JOB: `${baseUrl}/api/admin/job/addedJobs`,

    // Email verification

    EMAIL_VERIFICATION: `${baseUrl}/api/candidate/verificationRequest`,

    NEW_ACCOUNT_VALIDATION: `${baseUrl}/api/verify/`,

    //Chat Conversation
    CREATE_CONVERSATIONS: `${baseUrl}/api/conversation/create`,
    GET_CONVERSATION_BY_COMPANY: `${baseUrl}/api/company/conversation`,
    GET_CONVERSATION_BY_CANDIDATE: `${baseUrl}/api/candidate/conversation`,
    CREATE_CHAT_MESSAGE_BY_CANDIDATE: `${baseUrl}/api/candidate/messages/create`,
    CREATE_CHAT_MESSAGE_BY_COMPANY: `${baseUrl}/api/company/messages/create`,
    GET_CANDIDATE_MESSAGE_BY_ID: `${baseUrl}/api/candidate/messages/`,
    GET_COMPANY_MESSAGE_BY_ID: `${baseUrl}/api/company/messages/`,
    GET_NOTIFICATION_STATUS_CANDIDATE:`${baseUrl}/api/messages/candidate/notification`,
    GET_NOTIFICATION_STATUS_COMPANY:`${baseUrl}/api/messages/company/notification`,
    END_CONVERSATION_COMPANY:`${baseUrl}/api/company/messages/endconversation`,
    END_CONVERSATION_CANDIDATE:`${baseUrl}/api/candidate/messages/endconversation`,

    GET_ALL_JOBS: `${baseUrl}/api/admin/job/all`,
    //DEACTIVATE_JOB: `${baseUrl}/api/admin/job/deactivate/`, //not in use
    //ACTIVATE_JOB: `${baseUrl}/api/admin/job/activate/`, //not in use
    APPROVE_JOB: `${baseUrl}/api/admin/job/approve/`,
    REJECT_LIST: `${baseUrl}/api/admin/job/reject/`,
    DELETE_JOB: `${baseUrl}/api/admin/job/delete/`,

    //job for candidate view
    GET_ALL_JOBS_FOR_CANDIDATE: `${baseUrl}/api/candidates/job/applications`,
    //GET_ALL_JOBS_FOR_CANDIDATE_BY_ID: `${baseUrl}/api/candidates/application/`, //not in use
    GET_ALL_JOBS_BASED_ON_RANKING_FOR_CANDIDATE: `${baseUrl}/api/candidates/jobs/ranking`,
    APPLY_JOBS_FOR_CANDIDATE_BY_ID: `${baseUrl}/api/candidates/job/apply/`,

    /* __________ Company EndPoints ___________ */

    CLIENT_JOB_LIST: "/api/company/jobs",
    CLIENT_CANDIDATE_LIST: "/api/company/candidates/",
    CLIENT_CANDIDATE_SELECTION: "/api/company/selection/",
    CLIENT_CANDIDATE_DELETE: "/api/company/selection/remove/",
    // All Job For landing page 
    ALL_JOBS : `${baseUrl}/api/candidates/jobs/allJobs`

};
export default ApiConstants;
