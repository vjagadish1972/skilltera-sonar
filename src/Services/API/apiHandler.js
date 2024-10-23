import axios from "axios";
import SessionStorageService from "../sessionStorageHandler";
const SC = SessionStorageService.getService();
let token = SC.getAccessToken();
//Constants
export const API_URL = "https://skilltera-api-eta.vercel.app";

//Instance
export const apiInstance = axios.create({
    baseURL: API_URL,
});
/*====== Interceptor =======*/
apiInstance.interceptors.request.use(
    (request) => {
        request.headers = {
            token: token,
        };
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    //redirecting to login page on following error codes
    function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = "/login";
        }
        console.log(error);

        return Promise.reject(error);
    }
);

/* _____Common APIs_____ */
