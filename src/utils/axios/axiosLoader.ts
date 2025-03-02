// import {AuthProvider} from "../auth/authProvider.ts";
import {fetchActivity} from "./configs/activityAxios";
import {fetchInstitution} from "./configs/institutionAxios";
import {fetchReview} from "./configs/reviewAxios";
import {fetchTag} from "./configs/tagAxios";
import {fetchTask} from "./configs/taskAxios";
import {fetchUser} from "./configs/userAxios";
import {fetchEmail} from "./configs/emailAxios.ts";

const axiosServices = [
    fetchUser,
    fetchActivity,
    fetchTag,
    fetchTask,
    fetchReview,
    fetchInstitution,
    fetchEmail
];

export const initAxiosServices = (/* queryParams: TGenericObject = {} */) => {
    axiosServices.forEach((/*service*/) => {
        // service.defaults.headers.common["Content-Type"] = "application/json";
        // service.defaults.headers.common.Authorization = `Bearer ${AuthProvider.authToken}`;
        //
        // service.interceptors.request.use(async (config) => {
        //     const redirectUrl = AuthProvider.checkAuthentication();
        //     if (redirectUrl) window.location.href = redirectUrl;
        //     return config;
        // });
        //
        // service.interceptors.response.use(
        //     (res) => res,
        //     async (error) => {
        //         if (error.response.status === 401) {
        //             const redirectUrl = AuthProvider.checkAuthentication();
        //             if (redirectUrl) window.location.href = redirectUrl;
        //         }
        //     }
        // );
    });
};
