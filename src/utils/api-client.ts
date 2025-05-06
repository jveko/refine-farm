import { msalInstance, tokenRequest } from "@/config"
import { TOKEN_KEY } from "@/constants"
import { HttpError } from "@refinedev/core"
import ky, { HTTPError, type KyInstance } from "ky"
import type { Options } from "ky/distribution/types/options"

/**
 * ApiService - Centralized service for API requests with token handling
 *
 * This service provides:
 * - Automatic token inclusion in requests
 * - Token refresh on 401 errors
 * - Request cancellation
 * - Request/response interceptors
 * - Typed API methods
 */
export class ApiClient {
  public instance: KyInstance
  constructor(config: Options) {
    this.instance = ky.create({
      ...config,
      retry: {
        limit: 3,
        statusCodes: [401, 408, 413, 429, 500, 502, 503, 504],
      },

      hooks: {
        beforeRequest: [
          (request) => {
            const token = localStorage.getItem(TOKEN_KEY)
            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`)
            }
          },
        ],
        beforeRetry: [
          async ({ request, error }) => {
            console.log()
            if (error instanceof HTTPError) {
              if (error.response?.status === 401) {
                const account = msalInstance.getActiveAccount()
                if (!account) {
                  console.warn("No active account found, redirecting to login")
                  return ky.stop
                }
                try {
                  const token = await msalInstance.acquireTokenSilent({
                    scopes: tokenRequest.scopes,
                    account: account,
                  })
                  if (token) {
                    localStorage.setItem(TOKEN_KEY, token.accessToken)
                    request.headers.set("Authorization", `Bearer ${token.accessToken}`)
                  } else {
                    console.warn("No token found, redirecting to login")
                    return ky.stop
                  }
                } catch (error) {
                  console.error("Error acquiring token silently:", error)
                  return ky.stop
                }
              }
            }
            return
          },
        ],
        beforeError: [
          (error) => {
            if (error.response?.status === 401) {
              // Handle 401 error
              console.error("Unauthorized access - redirecting to login")
            }
            return error
          },
        ],
      },
    })
  }
}
