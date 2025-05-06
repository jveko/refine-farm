import {
    BrowserCacheLocation,
    type Configuration, EventMessage, EventType,
    PublicClientApplication,
} from "@azure/msal-browser"
import {AuthenticationResult} from "@azure/msal-browser/src/response/AuthenticationResult";

// Environment variables for Azure AD configuration
const {
    VITE_AUTH_AZURE_CLIENT_ID,
    VITE_AUTH_AZURE_AUTHORITY,
    VITE_AUTH_AZURE_SCOPE,
} = import.meta.env

// Validate required environment variables
if (!VITE_AUTH_AZURE_CLIENT_ID) {
    throw new Error("AUTH_AZURE_CLIENT_ID is not set")
}
if (!VITE_AUTH_AZURE_AUTHORITY) {
    throw new Error("AUTH_AZURE_AUTHORITY is not set")
}
if (!VITE_AUTH_AZURE_SCOPE) {
    throw new Error("AUTH_AZURE_SCOPE is not set")
}

// MSAL Configuration
const msalConfig: Configuration = {
    auth: {
        clientId: VITE_AUTH_AZURE_CLIENT_ID,
        authority: VITE_AUTH_AZURE_AUTHORITY,
        redirectUri: window.location.origin,
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return
                }
                switch (level) {
                    case 0:
                        console.error(message)
                        return
                    case 1:
                        console.warn(message)
                        return
                    case 2:
                        console.info(message)
                        return
                    case 3:
                        console.debug(message)
                        return
                    default:
                        console.log(message)
                        return
                }
            },
            piiLoggingEnabled: false,
            logLevel: import.meta.env.MODE === "development" ? 3 : 1,
        },
        asyncPopups: true, // Enable async popups for better UX
        allowPlatformBroker: true,
    },
}

// Initialize MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig)
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.INITIALIZE_END) {
        const account = msalInstance.getActiveAccount()
        if (account) {
            return;
        }
        const accounts = msalInstance.getAllAccounts()
        if (accounts.length === 1) {
            const account = accounts[0]
            msalInstance.setActiveAccount(account)
            return;
        }
    }
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        const payload = event.payload as AuthenticationResult;
        if(payload){
            msalInstance.setActiveAccount(payload.account);
        }
    }
    if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        const tokenResponse = event as EventMessage;
        console.log("Access Token: ", tokenResponse);
    }
}, [EventType.INITIALIZE_END, EventType.ACQUIRE_TOKEN_SUCCESS, EventType.LOGIN_SUCCESS]);

// Token request configuration
export const tokenRequest = {
    scopes: [VITE_AUTH_AZURE_SCOPE],
}
