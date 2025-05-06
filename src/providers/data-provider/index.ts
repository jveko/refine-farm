import {ApiClient} from "@/utils/api-client"
import type {DataProvider, LogicalFilter} from "@refinedev/core"
import queryString from "query-string"
import {generateFilter} from "./generateFilter"
import {generateSort} from "./generateSort"
import {IGetListResponse} from "@interfaces";

type MethodTypes = "get" | "delete" | "head" | "options"
type MethodTypesWithBody = "post" | "put" | "patch"

const dataProviderFactory = (
    service: ApiClient,
    apiUrl: string,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => ({
    getList: async ({resource, pagination, filters, sorters, meta}) => {
        const url = `${resource}`
        const {current = 1, pageSize = 10, mode = "server"} = pagination ?? {}
        const {headers: headersFromMeta, method, queries: queriesFromMeta} = meta ?? {}
        const requestMethod = (method as MethodTypes) ?? "get"
        const searchAll = filters?.filter((x) => (x as LogicalFilter)?.field == "q").at(0)

        if (searchAll != undefined) {
            filters = filters?.filter((x) => (x as LogicalFilter)?.field != "q")
        }
        const queryFilters = generateFilter(filters)
        const query: {
            page?: number
            size?: number
            sort?: string
        } = {}

        if (mode === "server") {
            query.page = current
            query.size = pageSize
        }

        const generatedSort = generateSort(sorters)
        if (generatedSort) {
            const {_sort, _order} = generatedSort
            query.sort = _sort
                .map((sort, i) => {
                    if (_order[i] === "desc") return `-${sort}`
                    return sort
                })
                .join(",")
        }
        const combinedQuery: {
            page?: number
            size?: number
            filters?: string
            sort?: string
            search?: string
            [key: string]: any
        } = {...query, filters: queryFilters, ...queriesFromMeta}

        if (searchAll != undefined) {
            combinedQuery["search"] = searchAll.value
        }
        const urlWithQuery = Object.keys(combinedQuery).length ? `${url}?${queryString.stringify(combinedQuery)}` : url
        const data = await service.instance(urlWithQuery, {
            method: requestMethod,
            headers: headersFromMeta
        }).json<any>()
        console.log(data)
        const total = +data["totalData"]
        return {
            data: data["data"] || data,
            total: total || data.length,
        }
    },

    getMany: async ({resource, ids, meta}) => {
        const {headers, method} = meta ?? {}
        const requestMethod = (method as MethodTypes) ?? "get"
        const url = `${resource}?${queryString.stringify({id: ids})}`;
        const data = await service.instance(url, {
            method: requestMethod,
            headers: headers
        }).json<any>()

        return {
            data,
        }
    },

    create: async ({resource, variables, meta}) => {
        const url = `${resource}`

        const {headers, method} = meta ?? {}
        const requestMethod = (method as MethodTypesWithBody) ?? "post"

        const data = await service.instance(url, {
            method: requestMethod,
            headers: headers,
            json: variables
        }).json<any>();

        return {
            data,
        }
    },

    update: async ({resource, id, variables, meta}) => {
        const url = `${resource}/${id}`

        const {headers, method} = meta ?? {}
        const requestMethod = (method as MethodTypesWithBody) ?? "patch"

        const data = await service.instance(url, {
            method: requestMethod,
            headers: headers,
            json: variables
        }).json<any>();

        return {
            data,
        }
    },

    getOne: async ({resource, id, meta}) => {
        const url = `${resource}/${id}`

        const {headers, method} = meta ?? {}
        const requestMethod = (method as MethodTypes) ?? "get"

        const data = await service.instance(url, {
            method: requestMethod,
            headers: headers,
        }).json<any>();

        return {
            data,
        }
    },

    deleteOne: async ({resource, id, variables, meta}) => {
        const url = `${resource}/${id}`

        const {headers, method} = meta ?? {}
        const requestMethod = (method as MethodTypesWithBody) ?? "delete"

        const data = await service.instance(url, {
            method: requestMethod,
            headers: headers,
            json: variables
        }).json<any>();

        return {
            data,
        }
    },

    getApiUrl: () => {
        return apiUrl
    },
    custom: async ({url, method, filters, sorters, payload, query, headers, meta}) => {
        let requestUrl = `${url}?`

        if (sorters) {
            const generatedSort = generateSort(sorters)
            if (generatedSort) {
                const {_sort, _order} = generatedSort
                const sortQuery = {
                    _sort: _sort.join(","),
                    _order: _order.join(","),
                }
                requestUrl = `${requestUrl}&${queryString.stringify(sortQuery)}`
            }
        }
        if (meta?.queries) {
            requestUrl = `${requestUrl}&${queryString.stringify(meta.queries)}`
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${queryString.parse(filterQuery)}`;
        }

        if (query) {
            requestUrl = `${requestUrl}&${queryString.stringify(query)}`
        }

        let response
        switch (method) {
            case "put":
            case "post":
            case "patch":
                response = await service.instance(url, {
                    method: method,
                    json: payload,
                    headers,
                }).json<any>();
                break
            case "delete":
                response = await service.instance(url, {
                    method: method,
                    json: payload,
                    headers: headers,
                }).json<any>();
                break
            default:
                response = await service.instance.get(requestUrl, {
                    headers,
                }).json<any>();
                break
        }

        return Promise.resolve(response)
    },
})

const {VITE_APP_API_URL} = import.meta.env
if (!VITE_APP_API_URL) {
    throw new Error("APP_API_URL is not defined")
}

export const dataProvider = dataProviderFactory(
    new ApiClient({
        prefixUrl: VITE_APP_API_URL
    }),
    VITE_APP_API_URL,
)
