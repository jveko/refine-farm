import { GlobalStyle } from "@/config";
import { LoginPage } from "@/pages/login";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router-v6";
import { Outlet, RouteObject } from "react-router-dom";

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
        element: <LoginPage />,
      },
    ],
  }
];