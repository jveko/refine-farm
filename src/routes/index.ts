import type { RouteObject } from "react-router"
import { ErrorRoutes } from "./error-routes"
import { ProtectedRoutes } from "./protected-routes"
import { PublicRoutes } from "./public-routes"

export const router: RouteObject[] = [...ProtectedRoutes, ...PublicRoutes, ...ErrorRoutes]
