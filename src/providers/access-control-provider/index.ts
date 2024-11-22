import { AxiosInstance, isAxiosError } from "axios";
import { AccessControlProvider } from "@refinedev/core";
import { axiosAuth } from "@/config";

const { VITE_DOMAIN_APP: VITE_DOMAIN_APP } = import.meta.env;

if (!VITE_DOMAIN_APP) {
  throw new Error("DOMAIN_APP is not defined");
}

type CheckPermissionResponse = {
  isAllowed: boolean;
};
const accessControlProviderFactory = (
  httpClient: AxiosInstance
): AccessControlProvider => ({
  can: async ({ resource, action, params }) => {
    try {
      console.log(resource, action, params);
      const resp = await httpClient.get<CheckPermissionResponse>(
        "permissions/check",
        {
          params: {
            domain: VITE_DOMAIN_APP,
            resource: resource,
            subject: "DPL",
            action: action,
          },
        }
      );
      return {
        can: resp.data.isAllowed,
      };
    } catch (e) {
      if (isAxiosError(e)) {
        switch (e.response?.status) {
          case 401:
            return {
              can: false,
              reason: "Unauthorized",
            };
          case 403:
            return {
              can: false,
              reason: "Forbidden",
            };
        }
      }
      return {
        can: false,
        reason: (e as { message: string }).message,
      };
    }
  },
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: false,
    },
  },
});
export const accessControlProvider = accessControlProviderFactory(axiosAuth);
