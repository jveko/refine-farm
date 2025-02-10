import { TOKEN_KEY } from "@/constants";
import { msalInstance, tokenRequest } from "@/config";
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async () => {
    await msalInstance.loginRedirect();
    return {
      success: true,
    };
  },
  register: async () => ({
    success: true,
  }),
  updatePassword: async () => ({
    success: true,
  }),
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    msalInstance.setActiveAccount(null);
    return {
      success: true,
      redirectTo: "/login?isLoggedOut=true",
    };
  },
  check: async () => {
    try {
      const account = msalInstance.getActiveAccount();
      if (account === null) {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
      // const request: SilentRequest = {
      //   ...tokenRequest,
      //   account: account,
      // };

      // const token = await msalInstance.acquireTokenSilent(request);
      // localStorage.setItem(TOKEN_KEY, token.accessToken);
      // const checkUserResp = await checkUser();
      // if (
      //   checkUserResp.status === "authorized" &&
      //   checkUserResp.user !== undefined
      // ) {
      //   setUser(checkUserResp.user);
      //   return { authenticated: true };
      // }
      // setUser(undefined);
      return {
        authenticated: true,
      };
    } catch (e) {
      console.log(e);
      return {
        authenticated: false,
      };
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => null,
  getIdentity: async (): Promise<undefined> => {
    return undefined;
  },
};
