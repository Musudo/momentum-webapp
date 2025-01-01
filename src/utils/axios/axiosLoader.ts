import { TGenericObject } from "../../types/commonTypes";
import { AuthProvider } from "../authProvider";
import { fetchActivity } from "./configs/activityAxios";
import { fetchTag } from "./configs/tagAxios";
import { fetchUser } from "./configs/userAxios";

const axiosServices = [fetchUser, fetchActivity, fetchTag];

export const initAxiosServices = (queryParams: TGenericObject = {}) => {
  axiosServices.forEach((service) => {
    service.defaults.headers.common.Authorization = `Bearer ${AuthProvider.authToken}`;

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
