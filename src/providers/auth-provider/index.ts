import {msalInstance, tokenRequest} from "@/config/msal"
import type {AuthProvider} from "@refinedev/core"
import {TOKEN_KEY} from "@/constants";

export const authProvider: AuthProvider = {
    login: async () => {
        try {
            const accounts = msalInstance.getAllAccounts()
            if (accounts.length === 1) {
                const account = accounts[0]
                try {
                    msalInstance.setActiveAccount(account)
                    const token = await msalInstance.acquireTokenSilent({
                        scopes: tokenRequest.scopes,
                        account: account,
                    })
                    localStorage.setItem(TOKEN_KEY, token.accessToken)
                } catch (silentRequestError) {
                    console.error(silentRequestError)
                }
            } else {
                await msalInstance.loginRedirect({
                    ...tokenRequest,
                    prompt: "select_account",
                })
            }
            return {
                success: true,
            }
        } catch (error) {
            console.error("Login error:", error)
            window.dispatchEvent(
                new CustomEvent("auth-error", {
                    detail: {
                        message: "We couldn't sign you in. Please try again.",
                        error,
                    },
                }),
            )
            return {
                success: false,
                error: undefined,
            }
        }
    },
    logout: async () => {
        try {
            localStorage.removeItem(TOKEN_KEY)
            msalInstance.setActiveAccount(null)
            return {
                success: true,
                redirectTo: "/login?isLoggedOut=true",
            }
        } catch (error) {
            console.error("Logout error:", error)
            // clearAuthData()
            return {
                success: true,
                redirectTo: "/login?isLoggedOut=true",
            }
        }
    },
    check: async () => {
        const activeAccount = msalInstance.getActiveAccount()
        if (!activeAccount) {
            return {
                authenticated: false,
                redirectTo: "/login",
            }
        }
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            const token = await msalInstance.acquireTokenSilent({
                scopes: tokenRequest.scopes,
                account: activeAccount,
            })
            if (token) {
                localStorage.setItem(TOKEN_KEY, token.accessToken)
            } else {
                console.warn("No token found, redirecting to login")
                return {
                    authenticated: false,
                    redirectTo: "/login",
                }
            }
        }
        return {
            authenticated: true,
        }
    },
    onError: async (error) => {
        // Check if the error is related to authentication
        if (error?.response?.status === 401) {
            try {
                const accounts = msalInstance.getAllAccounts()
                if (accounts.length === 0) {
                    console.warn("Authentication error: No accounts found, redirecting to login")
                    return {
                        error,
                        logout: true,
                        redirectTo: "/login",
                    }
                }

                const account = accounts[0]
                msalInstance.setActiveAccount(account)
                // Attempt to acquire a new token silently
                const token = await msalInstance.acquireTokenSilent({
                    ...tokenRequest,
                    account: account,
                })


                if (!token) {
                    // If we couldn't refresh the token, redirect to login
                    console.warn("Authentication error: Unable to refresh token, redirecting to login")
                    // Notify the user of the error
                    window.dispatchEvent(
                        new CustomEvent("auth-error", {
                            detail: {
                                message: "Your session has expired. Please sign in again.",
                                error,
                            },
                        }),
                    )

                    return {
                        error,
                        logout: true,
                        redirectTo: "/login",
                    }
                }
                // If we successfully refreshed the token, we can retry the request
                console.debug("Token refreshed successfully after 401 error")
                return {error}
            } catch (refreshError) {
                console.error("Error refreshing token in onError:", refreshError)
                return {
                    error,
                    logout: true,
                    redirectTo: "/login",
                }
            }
        } else if (error?.response?.status === 403) {
            // Forbidden - user doesn't have permission
            console.warn("Permission error: User doesn't have access to this resource")

            // Notify the user of the error
            window.dispatchEvent(
                new CustomEvent("auth-error", {
                    detail: {
                        message: "You don't have permission to access this resource.",
                        error,
                    },
                }),
            )

            // We don't log out here, just return the error
            return {error}
        } else if (error?.response?.status >= 500) {
            // Server error
            console.error("Server error:", error)

            // Notify the user of the error
            window.dispatchEvent(
                new CustomEvent("auth-error", {
                    detail: {
                        message: "A server error occurred. Please try again later.",
                        error,
                    },
                }),
            )

            return {error}
        }

        console.error("Unhandled error:", error)
        return {error}
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const user = msalInstance.getActiveAccount()
        if (!user) {
            return undefined
        }
        return {
            id: user.localAccountId,
            name: user.name || user.username,
            email: user.username,
        }
    },
    register: async () => ({
        success: false,
    }),
    updatePassword: async () => ({
        success: false,
    }),
}
