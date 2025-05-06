import {ApiClient} from "@/utils/api-client"
import type {AccessControlProvider} from "@refinedev/core"
import ky, {HTTPError} from "ky";

const {VITE_DOMAIN_APP} = import.meta.env

if (!VITE_DOMAIN_APP) {
    throw new Error("DOMAIN_APP is not defined")
}

type CheckPermissionResponse = {
    isAllowed: boolean
}
const accessControlProviderFactory = (
    service: ApiClient
): AccessControlProvider => ({
    can: async ({resource, action, params}) => {
        try {
            console.log(resource, action, params)
            const searchParams = new URLSearchParams()
            // searchParams.append("domain", VITE_DOMAIN_APP)
            searchParams.append("resource", resource!)
            searchParams.append("action", action)
            searchParams.append("subject", "DPL")
            const resp = await service.instance.get<CheckPermissionResponse>("permissions/check", {
                searchParams: searchParams,
            }).json()
            return {
                can: resp.isAllowed,
            }
        } catch (e) {
            console.log("error", )
            if (e instanceof HTTPError) {
                switch (e.response?.status) {
                    case 400:
                        return {
                            can: false,
                            reason: "Validation Error",
                        }
                    case 401:
                        return {
                            can: false,
                            reason: "Unauthorized",
                        }
                    case 403:
                        return {
                            can: false,
                            reason: "Forbidden",
                        }
                }
            }
            return {
                can: false,
                reason: (e as { message: string }).message,
            }
        }
    },
    options: {
        buttons: {
            enableAccessControl: true,
            hideIfUnauthorized: false,
        },
    },
})

const {VITE_AUTH_API_URL} = import.meta.env

if (!VITE_AUTH_API_URL) {
    throw new Error("AUTH_API_URL is not defined")
}

export const accessControlProvider = accessControlProviderFactory(
    new ApiClient({
        prefixUrl: VITE_AUTH_API_URL
    })
)
