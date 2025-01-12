import { TGenericObject } from "../../types/commonTypes";
import { AuthProvider } from "../authProvider";
import { fetchActivity } from "./configs/activityAxios";
import { fetchInstitution } from "./configs/institutionAxios";
import { fetchReview } from "./configs/reviewAxios";
import { fetchTag } from "./configs/tagAxios";
import { fetchTask } from "./configs/taskAxios";
import { fetchUser } from "./configs/userAxios";

const axiosServices = [
  fetchUser,
  fetchActivity,
  fetchTag,
  fetchTask,
  fetchReview,
  fetchInstitution,
];

export const initAxiosServices = (/* queryParams: TGenericObject = {} */) => {
  axiosServices.forEach((service) => {
    service.defaults.headers.common.Authorization = `Bearer ${AuthProvider.authToken}`;

    // service.interceptors.request.use(async (config) => {
    //   const redirectUrl = await Authentication.checkAuthentication();
    //   if (redirectUrl) window.location.href = redirectUrl;
    //   return config;
    // });

    service.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response.status === 401) {
          const redirectUrl = await AuthProvider.checkAuthentication();
          if (redirectUrl) window.location.href = redirectUrl;
        }
      }
    );
  });
};
