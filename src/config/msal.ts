import { TOKEN_KEY } from "@/constants";
import {
  AccountInfo,
  Configuration,
  EventPayload,
  EventType,
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";
const {
  VITE_AUTH_AZURE_CLIENT_ID: VITE_AUTH_AZURE_CLIENT_ID,
  VITE_AUTH_AZURE_AUTHORITY: VITE_AUTH_AZURE_AUTHORITY,
  VITE_AUTH_AZURE_REDIRECT_URI: VITE_AUTH_AZURE_REDIRECT_URI,
  VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI: VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI,
  VITE_AUTH_AZURE_SCOPE: VITE_AUTH_AZURE_SCOPE,
} = import.meta.env;

if (!VITE_AUTH_AZURE_CLIENT_ID) {
  throw new Error("AUTH_AZURE_CLIENT_ID is not set");
}
if (!VITE_AUTH_AZURE_AUTHORITY) {
  throw new Error("AUTH_AZURE_AUTHORITY is not set");
}
if (!VITE_AUTH_AZURE_REDIRECT_URI) {
  throw new Error("AUTH_AZURE_REDIRECT_URI is not set");
}
if (!VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI) {
  throw new Error("AUTH_AZURE_POST_LOGOUT_REDIRECT_URI is not set");
}
if (!VITE_AUTH_AZURE_SCOPE) {
  throw new Error("AUTH_AZURE_SCOPE is not set");
}

const msalConfig: Configuration = {
  auth: {
    clientId: VITE_AUTH_AZURE_CLIENT_ID,
    authority: VITE_AUTH_AZURE_AUTHORITY,
    redirectUri: VITE_AUTH_AZURE_REDIRECT_URI,
    postLogoutRedirectUri: VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(async (event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload: EventPayload = event.payload;
    msalInstance.setActiveAccount(payload as AccountInfo);

    const account = msalInstance.getActiveAccount();
    const request: SilentRequest = {
      ...tokenRequest,
      account: account == null ? undefined : account,
    };
    try {
      const response = await msalInstance.acquireTokenSilent(request);
      localStorage.setItem(TOKEN_KEY, response.accessToken);
    } catch (e) {
      msalInstance.acquireTokenPopup(request).then((response) => {
        localStorage.setItem(TOKEN_KEY, response.accessToken);
      });
    }
  }
  if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    msalInstance.setActiveAccount(event.payload as AccountInfo);
  }
});

export const loginRequest = {
  scopes: [VITE_AUTH_AZURE_SCOPE],
};

export const tokenRequest = {
  scopes: [VITE_AUTH_AZURE_SCOPE],
};

export const graphConfig = {
  graphMeEndpoint: "ENTER_THE_GRAPH_ENDPOINT_HERE/v1.0/me",
};
