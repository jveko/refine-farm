import { GlobalStyle } from "@/config";
import { AuthPage } from "@/pages/auth";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";
import { Outlet, RouteObject } from "react-router";

export const PublicRoutes: RouteObject[] = [
  {
    element: (
      <>  
        <GlobalStyle />
        <Authenticated
          key="authenticated-outer"
          fallback={<Outlet />}
          v3LegacyAuthProviderCompatible={false}
        >
          <NavigateToResource />
        </Authenticated>
      </>

    ),
    children: [
      {
        path: "/login",
        element: <AuthPage />,
      },
    ],
  }
];