import { FullScreenLoading } from "@/components/ui/loading"
import { AuthPage } from "@/pages/auth"
import { Authenticated } from "@refinedev/core"
import { NavigateToResource } from "@refinedev/react-router"
import { useEffect, useState } from "react"
import { Navigate, Outlet, type RouteObject, useLocation } from "react-router"

// Component to handle login page with location state
const LoginPageWrapper = () => {
  const location = useLocation()
  const from = location.state?.from || "/"

  return <AuthPage />
}

export const PublicRoutes: RouteObject[] = [
  {
    element: (
      <>
        <Authenticated
          key="authenticated-outer"
          fallback={<Outlet />}
          v3LegacyAuthProviderCompatible={false}
          loading={<FullScreenLoading message="Checking authentication..." />}
          params={{
            check: {
              scopes: ["openid", "profile", "email"],
            },
          }}
        >
          <NavigateToResource />
        </Authenticated>
      </>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPageWrapper />,
      },
      // Catch-all route for public routes
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]
