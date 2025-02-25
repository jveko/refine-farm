import { GlobalStyle } from "@/config";
import { AuthPage } from "@/pages/auth";
import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";
import { Outlet, RouteObject, useLocation, Navigate } from "react-router";
import { FullScreenLoading } from "@/components/ui/loading";
import { useEffect, useState } from "react";

// Component to handle redirection with smooth transition
const SmoothRedirect = () => {
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  useEffect(() => {
    // Short delay for better UX
    const timer = setTimeout(() => {
      setIsRedirecting(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isRedirecting) {
    return <FullScreenLoading message="Redirecting to dashboard..." />;
  }
  
  return <NavigateToResource />;
};

// Component to handle login page with location state
const LoginPageWrapper = () => {
  const location = useLocation();
  const from = location.state?.from || "/";
  
  return <AuthPage />;
};

export const PublicRoutes: RouteObject[] = [
  {
    element: (
      <>
        <GlobalStyle />
        <Authenticated
          key="authenticated-outer"
          fallback={<Outlet />}
          v3LegacyAuthProviderCompatible={false}
          loading={<FullScreenLoading message="Checking authentication..." />}
        >
          <SmoothRedirect />
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
        element: <Navigate to="/login" replace />
      }
    ],
  }
];