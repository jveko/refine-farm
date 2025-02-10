import { RouteObject } from "react-router";
import { ErrorRoutes } from "./error-routes";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";

export const router: RouteObject[] = [
  ...ProtectedRoutes,
  ...PublicRoutes,
  ...ErrorRoutes,
];
